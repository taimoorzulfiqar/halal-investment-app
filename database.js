const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function getUserById(userId) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId);

    if (error) {
        throw error;
    }

    return data;
}

module.exports = {
    getUserById,
};
