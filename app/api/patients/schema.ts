import z from 'zod';

const schema = z.object({
    /* Personal Data */
    nome: z.string().min(2),
   cpf: z.string().min(1).max(11),
    cns: z.string().min(1).max(15),
     nascimento: z.string().min(1),
    cep: z.string().min(8).max(8),
    endereco: z.string().min(1),
    numero: z.string().min(1),
    complemento: z.string().min(1),
    bairro: z.string().min(1),
    cidade: z.string().min(1),
    telefone: z.string().min(7).max(14),
    telefoneFamiliar: z.string().min(7).max(14),
    cor: z.string().min(5).max(8),
    estadoCivil: z.string().min(5).max(10),
    escolaridade: z.string().min(1),
    renda: z.string().min(1),
    profissao: z.string().min(1),
    equipeReferencia: z.string().min(1),
    centroSaudeReferencia: z.string().min(1).max(50), 

    /* Historical Data */
  /*   gestacoesAnteriores: z.string().min(1).max(4),
    partosNormaisAnteriores: z.string().min(1).max(4),
    partosCesarianasAnteriores: z.string().min(1).max(4),
    abortosAnteriores: z.string().min(1).max(4),
    dataUltimaGestacao: z.string().optional(),
    dataUltimaMenstruacao: z.string().optional(),
    diasMenstruada: z.string().min(1).max(4).optional(),
    intervaloEntreCiclosMenstruais: z.string().optional(),
    volumeMenstrual: z.string().optional(),
    colicas: z.string().min(1).max(9),
    contraceptivosAnteriores: z.string().optional(),
    contraceptivosAtuais: z.string().optional(),
    ultimoPreventivoAlterado: z.string().optional(),
    dataUltimoPreventivo: z.string().optional(),
    possuiQualIst: z.string().min(1),
    fezQualCirurgiaPelvicaUterina: z.string().optional(),
    problemasSaude: z.string().optional(),
    medicacaoEmUso: z.string().optional(),
    alergiaCobreMedicamento: z.string().optional(),
    fezQualExameAlteracaoUtero: z.string().optional(),
    examesAnteriores: z.string().optional(),
    porqueInserirDIU: z.string(),
    duvidasSobreInsercaoDIU: z.string(),
    possuiTermoConsentimento: z.boolean(), */

    /* PhysicalExam */
    /* alturacm: z.string().optional(),
    pesokg: z.string().optional(),
    imc: z.string().optional(),
    realizouTesteGravidez: z.string().optional(),
    resultadoTesteGravidez: z.string().optional(),
    seSemTesteDeGravidezPorque: z.string().optional(),

    qualAlteracaoInspecaoGenital: z.string().min(1),
   
    qualAlteracaoExameEspecular: z.string().min(1),
 */
    /* DIU Insertion */
  /*   diuInserido: z.string().min(2).max(3),
    seDiuNaoInseridoPorque: z.string().optional(),
    usoPrevioAINE: z.string(),
    antissepsiaRealizadaCom: z.string().optional(),
    histerometria: z.string().min(1).max(2),
    tamanhoFio: z.string().min(1).max(2),
    modeloDiu: z.string().optional(),
    loteDiu: z.string().min(1),
    intercorrenciasDiu: z.string().optional(),
    nivelDor: z.string().min(1).max(2),
    profissionalInseriuNome: z.string().min(1),
    profissionalInseriuCRMCoren: z.string().min(1),
    centroSaudeInsercao: z.string().min(1).max(50),
    auxilioSegundoProfissional: z.string().optional(),
    profissionalAuxiliarNome: z.string().optional(),
    profissionalAuxiliarCRMCoren: z.string().optional(), */

    /* Post DIU Insertion */
   /*  dataAcompanhamento: z.string().optional(),
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
    qualOutraIntercorrenciaPosInsercao: z.string().optional(), */

    /* DIU Removal */
   /*  dataRemocaoDIU: z.string().optional(),
    motivoRemocaoDIU: z.string().optional(),
    prescricaoOutroContraceptivo: z.string().optional(),
    seraInseridoNovoDIU: z.string().optional(), */
    
})

export default schema;