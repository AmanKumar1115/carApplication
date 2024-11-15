import { clerkClient } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import mongoose from 'mongoose';
import { createUser } from "../../../../../actions/user.action"
import { NextResponse } from "next/server";

interface EmailAddress {
    id: string;
    email_address: string;
    verification: {
        status: string;
        strategy: string;
    };
}

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', { status: 400 })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occurred', { status: 400 })
    }

    const eventType = evt.type
    // const { id } = evt.data;  // Typecasting to UserCreatedEvent

    // Check if the event type is 'user.created'
    if (eventType === 'user.created') {
        // Type the 'email_addresses' array in the event data as EmailAddress[]
        const { id, first_name, last_name, email_addresses, created_at, primary_email_address_id } = evt.data as {
            id: string;
            first_name: string;
            last_name: string;
            email_addresses: EmailAddress[];
            created_at: number;
            primary_email_address_id: string;
        };

        // Retrieve the primary email from the email_addresses array
        const primaryEmailObj = email_addresses.find(
            (email: EmailAddress) => email.id === primary_email_address_id
        );
        const email = primaryEmailObj?.email_address;


        const name = `${first_name || ''} ${last_name || ''}`.trim();
        if (!email) {
            console.error('Missing required fields: clerkId or email')
            return new Response('Missing required fields', { status: 400 })
        }
        const user = {
            name: name,
            email: email,
            clerkId: id,

        }
        try {
            // Ensure database connection
            if (!mongoose.connection.readyState) {
                await mongoose.connect(process.env.MONGODB_URI!)
            }

            const newUser = await createUser(user);
            // Create or update the user
            // await User.findOneAndUpdate(
            //     { clerkId },
            //     { clerkId, email, name },
            //     { upsert: true, new: true }
            // )
            if (newUser) {
                const client = await clerkClient(); // Await the Promise to get the client instance
                await client.users.updateUserMetadata(id, {
                    publicMetadata: {
                        userId: newUser._id,
                    },
                });
            }
            return NextResponse.json({ message: "New user created", user: newUser });

            console.log(`User created/updated: ${email}`)
        } catch (error) {
            console.error('Error saving user to the database:', error)
            return new Response('Database error', { status: 500 })
        }
    }

    return new Response('', { status: 200 })
}
