declare global {
	namespace NodeJS {
		interface ProcessEnv extends CloudflareEnv {
      AUTH_URL: string;
      AUTH_SECRET: string;
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;

			R2_ENDPOINT: string;
			R2_ACCESS_KEY_ID: string;
			R2_SECRET_ACCESS_KEY: string;
			R2_PUBLIC_BUCKET_ADDRESS: string;
			R2_BUCKET_NAME: string;

			BACKEND_SECURITY_KEY: string;
			BACKEND_BASE_URL: string;

			CLOUDFLARE_ACCOUNT_ID: string;
			CLOUDFLARE_DATABASE_ID: string;
			CLOUDFLARE_D1_TOKEN: string;

			THREAD_CF_WORKER: string;
			THREAD_CF_AUTH: string;

			MOBILE_TRUST_TOKEN: string;

			RATELIMITER: {
				limit: ({ key: string }) => { success: boolean };
			};
			NEXT_PUBLIC_POSTHOG_KEY: string;
			NEXT_PUBLIC_POSTHOG_HOST: string;
		}
	}
}

export {};
