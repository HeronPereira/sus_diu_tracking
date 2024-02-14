-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profissional" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "matricula" TEXT NOT NULL,
    "corencrm" TEXT NOT NULL,
    "equipeVinculada" TEXT NOT NULL,
    "centroSaudeVinculado" TEXT NOT NULL,

    CONSTRAINT "Profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cns" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cep" TEXT NOT NULL DEFAULT '',
    "endereco" TEXT NOT NULL DEFAULT '',
    "numero" TEXT NOT NULL DEFAULT '',
    "complemento" TEXT NOT NULL DEFAULT '',
    "bairro" TEXT NOT NULL DEFAULT '',
    "cidade" TEXT NOT NULL DEFAULT '',
    "telefone" TEXT NOT NULL DEFAULT '',
    "telefoneFamiliar" TEXT NOT NULL DEFAULT '',
    "cor" TEXT NOT NULL DEFAULT '',
    "estadoCivil" TEXT NOT NULL DEFAULT '',
    "escolaridade" TEXT NOT NULL DEFAULT '',
    "renda" TEXT NOT NULL DEFAULT '',
    "profissao" TEXT NOT NULL DEFAULT '',
    "equipeReferencia" TEXT NOT NULL DEFAULT '',
    "centroSaudeReferencia" TEXT NOT NULL DEFAULT '',
    "gestacoesAnteriores" TEXT NOT NULL DEFAULT '',
    "partosNormaisAnteriores" TEXT NOT NULL DEFAULT '',
    "partosCesarianasAnteriores" TEXT NOT NULL DEFAULT '',
    "abortosAnteriores" TEXT NOT NULL DEFAULT '',
    "dataUltimaGestacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataUltimaMenstruacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diasMenstruada" TEXT NOT NULL DEFAULT '',
    "intervaloEntreCiclosMenstruais" TEXT NOT NULL DEFAULT '',
    "volumeMenstrual" TEXT NOT NULL DEFAULT '',
    "colicas" TEXT NOT NULL DEFAULT '',
    "contraceptivosAnteriores" TEXT NOT NULL DEFAULT '',
    "contraceptivosAtuais" TEXT NOT NULL DEFAULT '',
    "dataUltimoPreventivo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimoPreventivoAlterado" TEXT NOT NULL DEFAULT '',
    "possuiQualIst" TEXT NOT NULL DEFAULT '',
    "fezQualCirurgiaPelvicaUterina" TEXT NOT NULL DEFAULT '',
    "problemasSaude" TEXT NOT NULL DEFAULT '',
    "medicacaoEmUso" TEXT NOT NULL DEFAULT '',
    "alergiaCobreMedicamento" TEXT NOT NULL DEFAULT '',
    "fezQualExameAlteracaoUtero" TEXT NOT NULL DEFAULT '',
    "examesAnteriores" TEXT NOT NULL DEFAULT '',
    "porqueInserirDIU" TEXT NOT NULL DEFAULT '',
    "duvidasSobreInsercaoDIU" TEXT NOT NULL DEFAULT '',
    "possuiTermoConsentimento" TEXT NOT NULL DEFAULT '',
    "alturacm" TEXT NOT NULL DEFAULT '',
    "pesokg" TEXT NOT NULL DEFAULT '',
    "imc" TEXT NOT NULL DEFAULT '',
    "realizouTesteGravidez" TEXT NOT NULL DEFAULT '',
    "resultadoTesteGravidez" TEXT NOT NULL DEFAULT '',
    "seSemTesteDeGravidezPorque" TEXT NOT NULL DEFAULT '',
    "qualAlteracaoInspecaoGenital" TEXT NOT NULL DEFAULT '',
    "qualAlteracaoExameEspecular" TEXT NOT NULL DEFAULT '',
    "dataInsercao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diuInserido" TEXT NOT NULL DEFAULT '',
    "seDiuNaoInseridoPorque" TEXT NOT NULL DEFAULT '',
    "usoPrevioAINE" TEXT NOT NULL DEFAULT '',
    "antissepsiaRealizadaCom" TEXT NOT NULL DEFAULT '',
    "histerometriaCm" TEXT NOT NULL DEFAULT '',
    "tamanhoFioCm" TEXT NOT NULL DEFAULT '',
    "modeloDiu" TEXT NOT NULL DEFAULT '',
    "loteDiu" TEXT NOT NULL DEFAULT '',
    "intercorrenciasDiu" TEXT NOT NULL DEFAULT '',
    "nivelDor" TEXT NOT NULL DEFAULT '',
    "profissionalInseriuNome" TEXT NOT NULL DEFAULT '',
    "profissionalInseriuCRMCoren" TEXT NOT NULL DEFAULT '',
    "centroSaudeInsercao" TEXT NOT NULL DEFAULT '',
    "auxilioSegundoProfissional" TEXT NOT NULL DEFAULT '',
    "profissionalAuxiliarNome" TEXT NOT NULL DEFAULT '',
    "profissionalAuxiliarCRMCoren" TEXT NOT NULL DEFAULT '',
    "dataAcompanhamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diasSangramentoPosInsercao" TEXT NOT NULL DEFAULT '',
    "nivelSatisfacaoInsercao" TEXT NOT NULL DEFAULT '',
    "dataUltimaMenstruacaoPosInsercao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diasMenstruadaPosInsercao" TEXT NOT NULL DEFAULT '',
    "intervaloDiasUltimoCicloPosInsercao" TEXT NOT NULL DEFAULT '',
    "volumeMenstrualPosInsercao" TEXT NOT NULL DEFAULT '',
    "colicasPosInsercao" TEXT NOT NULL DEFAULT '',
    "tamanhoFioCmPosInsercao" TEXT NOT NULL DEFAULT '',
    "resultadoUSG" TEXT NOT NULL DEFAULT '',
    "intercorrenciasComunicadasPosInsercao" TEXT NOT NULL DEFAULT '',
    "qualOutraIntercorrenciaPosInsercao" TEXT NOT NULL DEFAULT '',
    "dataRemocaoDIU" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motivoRemocaoDIU" TEXT NOT NULL DEFAULT '',
    "prescricaoOutroContraceptivo" TEXT NOT NULL DEFAULT '',
    "seraInseridoNovoDIU" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_user_key" ON "Admin"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_cpf_key" ON "Profissional"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_email_key" ON "Profissional"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_cpf_key" ON "Patient"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_cns_key" ON "Patient"("cns");
