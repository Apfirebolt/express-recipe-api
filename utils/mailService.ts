import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

interface WelcomeEmailProps {
  to: string;
  name: string;
}

export const sendWelcomeEmail = async ({ to, name }: WelcomeEmailProps): Promise<void> => {
  const fromEmail = 'onboarding@resend.dev';

  console.log(`[Email] Attempting send to: ${to} from: ${fromEmail}`);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: 'Welcome to our platform!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2>Hello ${name},</h2>
          <p>Thanks for joining us. Your account is ready to use.</p>
          <p><a href="https://yourdomain.com/login" style="background:#0070f3;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">Go to Dashboard</a></p>
        </div>
      `,
    });

    if (error) {
      console.error('[Email Error Details]:', JSON.stringify(error, null, 2));
      return;
    }

    console.log('[Email Success] Email ID:', data?.id);
  } catch (err) {
    console.error('[Resend Network/Unexpected Exception]:', err);
  }
};