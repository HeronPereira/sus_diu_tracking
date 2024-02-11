import z from 'zod';

const schema = z.object({
    /* Profissional Data */
    cpf: z.string().min(1),
    senha: z.string().min(1),
    nome: z.string().min(2),
    email: z.string().min(1),
    nascimento: z.string().min(1),
    matricula: z.string().min(1),
    corencrm: z.string().min(1),
    equipeVinculada: z.string().min(1),
    centroSaudeVinculado: z.string().min(1), 
    
})

export default schema;