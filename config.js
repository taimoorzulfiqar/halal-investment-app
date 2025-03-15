module.exports = {
    // ...existing code...
    database: {
        // ...existing code...
        client: 'supabase',
        connection: {
            host: process.env.SUPABASE_HOST,
            user: process.env.SUPABASE_USER,
            password: process.env.SUPABASE_PASSWORD,
            database: process.env.SUPABASE_DATABASE,
            port: process.env.SUPABASE_PORT,
            ssl: { rejectUnauthorized: false }
        }
    }
    // ...existing code...
};
