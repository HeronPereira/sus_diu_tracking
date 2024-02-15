import z from 'zod';

const schema = z.object({
    /* Personal Data */
    nome: z.string().min(2),
    cpf: z.string().min(1),
    cns: z.string().min(1),
    nascimento: z.string().min(1),
    cep: z.string().min(8),
    endereco: z.string().min(1),
    numero: z.string().min(1),
    complemento: z.string().optional(),
    bairro: z.string().min(1),
    cidade: z.string().min(1),
    telefone: z.string().min(7),
    telefoneFamiliar: z.string().min(7),
    cor: z.string().min(5),
    estadoCivil: z.string().min(5),
    escolaridade: z.string().min(1),
    renda: z.string().min(1),
    profissao: z.string().min(1),
    equipeReferencia: z.string().min(1),
    centroSaudeReferencia: z.string().min(1), 

    /* Historical Data */
    gestacoesAnteriores: z.string().optional(),
    partosNormaisAnteriores: z.string().optional(),
    partosCesarianasAnteriores: z.string().optional(),
    abortosAnteriores: z.string().optional(),
    dataUltimaGestacao: z.string().optional(),
    dataUltimaMenstruacao: z.string().optional(),
    diasMenstruada: z.string().optional(),
    intervaloEntreCiclosMenstruais: z.string().optional(),
    volumeMenstrual: z.string().optional(),
    colicas: z.string().optional(),
    contraceptivosAnteriores: z.string().optional(),
    contraceptivosAtuais: z.string().optional(),
    ultimoPreventivoAlterado: z.string().optional(),
    dataUltimoPreventivo: z.string().optional(),
    possuiQualIst: z.string(),
    fezQualCirurgiaPelvicaUterina: z.string().optional(),
    problemasSaude: z.string().optional(),
    medicacaoEmUso: z.string().optional(),
    alergiaCobreMedicamento: z.string().optional(),
    fezQualExameAlteracaoUtero: z.string().optional(),
    examesAnteriores: z.string().optional(),
    porqueInserirDIU: z.string().optional(),
    duvidasSobreInsercaoDIU: z.string(),
    possuiTermoConsentimento: z.string(),

    /* PhysicalExam */
    alturacm: z.string().optional(),
    pesokg: z.string().optional(),
    imc: z.string().optional(),
    realizouTesteGravidez: z.string().optional(),
    resultadoTesteGravidez: z.string().optional(),
    seSemTesteDeGravidezPorque: z.string().optional(),

    qualAlteracaoInspecaoGenital: z.string().optional(),
   
    qualAlteracaoExameEspecular: z.string().optional(),

    /* DIU Insertion */
    diuInserido: z.string().optional(),
    seDiuNaoInseridoPorque: z.string().optional(),
    usoPrevioAINE: z.string().optional(),
    antissepsiaRealizadaCom: z.string().optional(),
    histerometria: z.string().optional(),
    tamanhoFio: z.string().optional(),
    modeloDiu: z.string().optional(),
    loteDiu: z.string().optional(),
    intercorrenciasDiu: z.string().optional(),
    nivelDor: z.string().optional(),
    profissionalInseriuNome: z.string().optional(),
    profissionalInseriuCRMCoren: z.string().optional(),
    centroSaudeInsercao: z.string().optional(),
    auxilioSegundoProfissional: z.string().optional(),
    profissionalAuxiliarNome: z.string().optional(),
    profissionalAuxiliarCRMCoren: z.string().optional(),

    /* Post DIU Insertion */
    dataAcompanhamento: z.string().optional(),
    diasSangramentoPosInsercao: z.string().optional(),
    nivelDorPosInsercao: z.string().optional(),
    nivelSatisfacaoInsercao: z.string().optional(),
    dataUltimaMenstruacaoPosInsercao: z.string().optional(),
    diasMenstruadaPosInsercao: z.string().optional(),
    intervaloDiasUltimoCicloPosInsercao: z.string().optional(),
    volumeMenstrualPosInsercao: z.string().optional(),
    colicasPosInsercao: z.string().optional(),
    tamanhoFioCmPosInsercao: z.string().optional(),
    resultadoUSG: z.string().optional(),
    intercorrenciasComunicadasPosInsercao: z.string().optional(),
    qualOutraIntercorrenciaPosInsercao: z.string().optional(),

    /* DIU Removal */
    dataRemocaoDIU: z.string().optional(),
    motivoRemocaoDIU: z.string().optional(),
    prescricaoOutroContraceptivo: z.string().optional(),
    seraInseridoNovoDIU: z.string().optional(),
    
})

export default schema;