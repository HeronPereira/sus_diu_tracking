import dayjs, { Dayjs } from 'dayjs';
// fileUtils.ts
import { getStorage, ref, deleteObject } from 'firebase/storage';
import app from './firebase';

const storage = getStorage(app);

export async function deleteFile(fileId: string): Promise<void> {
  const fileRef = ref(storage, fileId);

  try {
    await deleteObject(fileRef);
    console.log("File deleted successfully!");
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error; // Propagate the error if needed
  }
}


export const escolaridadeOptions = ['Analfabeta', 
'Fundamental - Incompleto',
'Fundamental - Completo',
'Médio - Incompleto',
'Médio - Completo',
'Superior - Incompleto',
'Superior - Completo',
'Pós-graduação - Incompleto',
'Pós-graduação - Completo'];

export const racaOptions = [                
    'BRANCA',
    'PRETA',
    'AMARELO',
    'PARDA',
    'INDÍGENA'];

export const estadoCivilOptions = ['Solteira', 'Casada', 'Separada', 'Divorciada', 'Viúva'];


export function getEscolaridade(key: number): string
{
    const escolaridade = ['Analfabeta', 
                        'Fundamental - Incompleto',
                        'Fundamental - Completo',
                        'Médio - Incompleto',
                        'Médio - Completo',
                        'Superior - Incompleto',
                        'Superior - Completo',
                        'Pós-graduação - Incompleto',
                        'Pós-graduação - Completo'];

    return escolaridade[key];
}

export const unidades_centro_de_atendimentos = ['Abraão',
    'Agronômica',
    'Alto Ribeirão',
    'Armação',
    'Balneário',
    'Barra da Lagoa',
    'Cachoeira do Bom Jesus',
    'Caieira da Barra do Sul',
    'Campeche',
    'Canasvieiras',
    'Canto da Lagoa',
    'Capivari',
    'Capoeiras',
    'Carianos',
    'Centro',
    'Coloninha',
    'Coqueiros',
    'Córrego Grande',
    'Costa da Lagoa',
    'Costeira do Pirajubaé',
    'Estreito',
    'Fazenda do Rio Tavares',
    'Ingleses',
    'Itacorubi',
    'Jardim Atlântico',
    'João Paulo',
    'Jurerê',
    'Lagoa da Conceição',
    'Monte Cristo',
    'Monte Serrat',
    'Morro das Pedras',
    'Novo Continente',
    'Pantanal',
    'Pântano do Sul',
    'Ponta das Canas',
    'Prainha',
    'Ratones',
    'Ribeirão da Ilha',
    'Rio Tavares',
    'Rio Vemelho',
    'Saco dos Limões',
    'Saco Grande',
    'Santinho',
    'Santo Antônio de Lisboa',
    'Sapé',
    'Tapera',
    'Trindade',
    'Vargem Grande',
    'Vargem Pequena',
    'Vila Aparecida',
    'Policlínica Centro',
    'Policlínica Rio Tavares',
    'Policlínica Continente',
    'Policlínica da Mulher e da Criança'];

export function getCentroSaudeReferencia(key: number): string
{
    const unidades_atendimentos = ['Abraão',
    'Agronômica',
    'Alto Ribeirão',
    'Armação',
    'Balneário',
    'Barra da Lagoa',
    'Cachoeira do Bom Jesus',
    'Caieira da Barra do Sul',
    'Campeche',
    'Canasvieiras',
    'Canto da Lagoa',
    'Capivari',
    'Capoeiras',
    'Carianos',
    'Centro',
    'Coloninha',
    'Coqueiros',
    'Córrego Grande',
    'Costa da Lagoa',
    'Costeira do Pirajubaé',
    'Estreito',
    'Fazenda do Rio Tavares',
    'Ingleses',
    'Itacorubi',
    'Jardim Atlântico',
    'João Paulo',
    'Jurerê',
    'Lagoa da Conceição',
    'Monte Cristo',
    'Monte Serrat',
    'Morro das Pedras',
    'Novo Continente',
    'Pantanal',
    'Pântano do Sul',
    'Ponta das Canas',
    'Prainha',
    'Ratones',
    'Ribeirão da Ilha',
    'Rio Tavares',
    'Rio Vemelho',
    'Saco dos Limões',
    'Saco Grande',
    'Santinho',
    'Santo Antônio de Lisboa',
    'Sapé',
    'Tapera',
    'Trindade',
    'Vargem Grande',
    'Vargem Pequena',
    'Vila Aparecida',
    'Policlínica Centro',
    'Policlínica Rio Tavares',
    'Policlínica Continente',
    'Policlínica da Mulher e da Criança']

    return(unidades_atendimentos[key]);
}

export function centrosDigitos(){
    const unidades = ['Abraão',
    'Agronômica',
    'Alto Ribeirão',
    'Armação',
    'Balneário',
    'Barra da Lagoa',
    'Cachoeira do Bom Jesus',
    'Caieira da Barra do Sul',
    'Campeche',
    'Canasvieiras',
    'Canto da Lagoa',
    'Capivari',
    'Capoeiras',
    'Carianos',
    'Centro',
    'Coloninha',
    'Coqueiros',
    'Córrego Grande',
    'Costa da Lagoa',
    'Costeira do Pirajubaé',
    'Estreito',
    'Fazenda do Rio Tavares',
    'Ingleses',
    'Itacorubi',
    'Jardim Atlântico',
    'João Paulo',
    'Jurerê',
    'Lagoa da Conceição',
    'Monte Cristo',
    'Monte Serrat',
    'Morro das Pedras',
    'Novo Continente',
    'Pantanal',
    'Pântano do Sul',
    'Ponta das Canas',
    'Prainha',
    'Ratones',
    'Ribeirão da Ilha',
    'Rio Tavares',
    'Rio Vemelho',
    'Saco dos Limões',
    'Saco Grande',
    'Santinho',
    'Santo Antônio de Lisboa',
    'Sapé',
    'Tapera',
    'Trindade',
    'Vargem Grande',
    'Vargem Pequena',
    'Vila Aparecida',
    'Policlínica Centro',
    'Policlínica Rio Tavares',
    'Policlínica Continente',
    'Policlínica da Mulher e da Criança']
    
    let  longest = unidades.sort(
        function (a, b) {
            return b.length - a.length;
        }
    )[0];
    return longest;
}

export const defaultDictionary = { 
    nome: '',
    cpf: '',
    cns: '',
    nascimento: dayjs(),
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    telefone: '',
    telefoneFamiliar: '',
    cor: '',
    estadoCivil: '',
    escolaridade: '',
    renda: '',
    profissao: '',
    equipeReferencia: '',
    centroSaudeReferencia: '',

   // /* Historical Data */
    gestacoesAnteriores: '0',
    partosNormaisAnteriores: '0',
    partosCesarianasAnteriores: '0',
    abortosAnteriores: '0',
    dataUltimaGestacao: dayjs(),
    dataUltimaMenstruacao: dayjs(),
    diasMenstruada: '0',
    intervaloEntreCiclosMenstruais: '0',
    volumeMenstrual: '',
    colicas: '',
    contraceptivosAnteriores:'',
    contraceptivosAtuais: '',
    ultimoPreventivoAlterado:'',
    dataUltimoPreventivo: dayjs(),
    possuiQualIst: '',
    fezQualCirurgiaPelvicaUterina:'',
    problemasSaude: '',
    medicacaoEmUso: '',
    alergiaCobreMedicamento: '',
    fezQualExameAlteracaoUtero: '',
    examesAnteriores: '',
    porqueInserirDIU: '',
    duvidasSobreInsercaoDIU: '',
    possuiTermoConsentimento: '',

 //   /* PhysicalExam */
    alturacm: '',
    pesokg:'',
    imc: '',
    realizouTesteGravidez: '',
    resultadoTesteGravidez: '',
    seSemTesteDeGravidezPorque: '',

    qualAlteracaoInspecaoGenital: '',
   
    qualAlteracaoExameEspecular: '',

 //   /* DIU Insertion */
    dataInsercao: dayjs(),
    diuInserido:'',
    seDiuNaoInseridoPorque: '',
    usoPrevioAINE: '',
    antissepsiaRealizadaCom: '',
    histerometriaCm: '',
    tamanhoFioCm: '',
    modeloDiu: '',
    loteDiu: '',
    intercorrenciasDiu:'',
    nivelDor:'',
    profissionalInseriuNome:'',
    profissionalInseriuCRMCoren:'',
    centroSaudeInsercao: '',
    auxilioSegundoProfissional: '',
    profissionalAuxiliarNome:'',
    profissionalAuxiliarCRMCoren:'',

 //   /* Post DIU Insertion */
    dataAcompanhamento:dayjs(),
    diasSangramentoPosInsercao: '',
    nivelSatisfacaoInsercao: '',
    dataUltimaMenstruacaoPosInsercao: dayjs(),
    diasMenstruadaPosInsercao: '',
    intervaloDiasUltimoCicloPosInsercao: '',
    volumeMenstrualPosInsercao:'',
    colicasPosInsercao:'',
    tamanhoFioCmPosInsercao: '',
    resultadoUSG:'',
    intercorrenciasComunicadasPosInsercao: '',
    qualOutraIntercorrenciaPosInsercao: '',

 //   /* DIU Removal */
    dataRemocaoDIU: dayjs(),
    motivoRemocaoDIU:'',
    prescricaoOutroContraceptivo:'',
    seraInseridoNovoDIU: ''
};


export const defaultProfissional = { 
    cpf: '',
    senha: '',
    nome: '',
    email: '',
    nascimento: dayjs(),
    matricula: '',
    corencrm: '',
    equipeVinculada: '',
    centroSaudeVinculado: '', 
};

enum messageTypes {
    'error' , 'success' , 'info' , 'warning'
  }

  
export type messageStyles = keyof typeof messageTypes;

function utils(){

}

export default utils;