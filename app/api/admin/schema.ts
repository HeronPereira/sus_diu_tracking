import z from 'zod';

const schema = z.object({
    /* Admin Data */
    user: z.string().min(1),
    senha: z.string().min(1),

})

export default schema;