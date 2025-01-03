// src/data/categoryMapping.js

// Tabla de mapeo que asocia códigos de GRUPO con las nuevas categorías y subcategorías

export const categoryMapping = {
    "Medicamentos": {
      subcategories: {
        "Anti-infecciosos": {
          subcategories: {
            "Antibióticos": {
                codes: ["0001","0047", "0234"],
                lineas: ["Antibióticos"],
                grupos: ["0001 ANTIBIÓTICOS ORALES", "0047 ANTIBIÓTICOS TÓPICOS", "0234 ANTIBACTERIANOS TÓPICOS"],
            },
            "Antimicóticos": {
              codes: ["0004"],
              lineas: ["Antimicóticos"],
              grupos: ["0004 ANTIMICÓTICOS"],
            },
            "Antivirales": {
              codes: ["0008"],
              lineas: ["Antivirales"],
              grupos: ["0008 ANTIVIRALES"],
            },
            "Antiparasitarios": {
              subcategories: {
                "Orales": {
                  codes: ["0007"],
                  lineas: ["Antiparasitarios"],
                  grupos: ["0007 ANTIPARASITARIOS"],
                },
                "Tópicos": {
                  codes: ["0056"],
                  lineas: ["Antiparasitarios"],
                  grupos: ["0056 ANTIPARASITARIOS TÓPICOS"],
                },
              },
            },
            "Anti-infecciosos ginecológicos": {
              codes: ["0053"],
              lineas: ["Anti-infecciosos ginecológicos"],
              grupos: ["0053 ANTIINFECCIOSOS GINECOLÓGICOS"],
            },
            "Antisépticos": {
              subcategories: {
                "Urinarios": {
                  codes: ["0054"],
                  lineas: ["Antisépticos"],
                  grupos: ["0054 ANTISÉPTICO URINARIO"],
                },
                "Bucofaríngeos": {
                  codes: ["0059"],
                  lineas: ["Antisépticos"],
                  grupos: ["0059 ANTISÉPTICO BUCOFARÍNGEO"],
                },
                "Tópicos": {
                  codes: ["0106"],
                  lineas: ["Antisépticos"],
                  grupos: ["0106 DESINFECTANTE TÓPICO"],
                },
              },
            },
          },
        },
        "Sistema Digestivo": {
          subcategories: {
            "Antiácidos y Antiulcerosos": {
              codes: ["0019", "0020"],
              lineas: ["Antiácidos y Antiulcerosos"],
              grupos: ["0019 ANTIÁCIDOS", "0020 ANTIULCEROSOS"],
            },
            "Antidiarreicos": {
              codes: ["0021"],
              lineas: ["Antidiarreicos"],
              grupos: ["0021 ANTIDIARREICOS"],
            },
            "Antiespasmódicos": {
              codes: ["0022"],
              lineas: ["Antiespasmódicos"],
              grupos: ["0022 ANTIESPASMODICOS"],
            },
            "Laxantes": {
              codes: ["0025"],
              lineas: ["Laxantes"],
              grupos: ["0025 LAXANTES"],
            },
            "Otros Digestivos": {
              codes: ["0023", "0048", "0052"],
              lineas: ["Otros Digestivos"],
              grupos: ["0023 OTROS DIGESTIVOS", "0048 ANTIEMÉTICO", "0052 ANTIHEMORROIDAL"],
            },
          },
        },
        "Sistema Nervioso": {
          subcategories: {
            "Antipsicóticos y Antidepresivos": {
              codes: ["0016", "0028"],
              lineas: ["Antipsicóticos y Antidepresivos"],
              grupos: ["0016 ANTIPSICÓTICOS", "0028 ANTIDEPRESIVOS"],
            },
            "Ansiolíticos e Hipnóticos": {
              codes: ["0017", "0018"],
              lineas: ["Ansiolíticos e Hipnóticos"],
              grupos: ["0017 HIPNÓTICOS", "0018 TRANQUILIZANTES"],
            },
            "Antiepilépticos y Antiparkinsonianos": {
              codes: ["0038", "0039"],
              lineas: ["Antiepilépticos y Antiparkinsonianos"],
              grupos: ["0038 ANTIEPILÉPTICOS", "0039 ANTIPARKINSONIANOS"],
            },
            "Otros del Sistema Nervioso": {
              codes: ["0077", "0085", "0086"],
              lineas: ["Otros del Sistema Nervioso"],
              grupos: ["0077 NEUROTÓNICOS", "0085 PSICOESTIMULANTES", "0086 RELAJANTE MUSCULAR"],
            },
          },
        },
        "Sistema Respiratorio": {
          subcategories: {
            "Antigripales y Antitusivos": {
              codes: ["0031", "0032"],
              lineas: ["Antigripales y Antitusivos"],
              grupos: ["0031 ANTIGRIPALES", "0032 ANTITUSIVOS"],
            },
            "Antiasmáticos": {
              codes: ["0033"],
              lineas: ["Antiasmáticos"],
              grupos: ["0033 ANTIASMÁTICOS"],
            },
            "Antialérgicos": {
              subcategories: {
                "Orales": {
                  codes: ["0029"],
                  lineas: ["Antialérgicos"],
                  grupos: ["0029 ANTIALÉRGICOS"],
                },
                "Oftálmicos": {
                  codes: ["0104"],
                  lineas: ["Antialérgicos"],
                  grupos: ["0104 ANTIALÉRGICOS OFTÁLMICOS"],
                },
              },
            },
            "Descongestionantes": {
              subcategories: {
                "Orales": {
                  codes: ["0041"],
                  lineas: ["Descongestionantes"],
                  grupos: ["0041 DESCONG ORAL"],
                },
                "Nasales": {
                  codes: ["0067"],
                  lineas: ["Descongestionantes"],
                  grupos: ["0067 DESCONG NASAL"],
                },
                "Tópicos": {
                  codes: ["0068"],
                  lineas: ["Descongestionantes"],
                  grupos: ["0068 DESCONG TÓPICO"],
                },
              },
            },
          },
        },
        "Sistema Cardiovascular": {
          subcategories: {
            "Antihipertensivos": {
              codes: ["0003"],
              lineas: ["Antihipertensivos"],
              grupos: ["0003 ANTIHIPERTENSIVOS"],
            },
            "Hipolipemiantes": {
              codes: ["0010"],
              lineas: ["Hipolipemiantes"],
              grupos: ["0010 HIPOLIPEMIANTES"],
            },
            "Otros Cardiovasculares": {
              codes: ["0012", "0051", "0060"],
              lineas: ["Otros Cardiovasculares"],
              grupos: ["0012 OTROS CARDIOVASCULAR", "0051 ANTIGOTOSO", "0060 ANTIVARICOSOS"],
            },
          },
        },
        "Sistema Endocrino y Hormonal": {
          subcategories: {
            "Diabetes": {
              codes: ["0009"],
              lineas: ["Diabetes"],
              grupos: ["0009 DIABÉTICOS"],
            },
            "Hormonas y Terapias Hormonales": {
              codes: ["0011", "0088"],
              lineas: ["Hormonas y Terapias Hormonales"],
              grupos: ["0011 HORMONOTERAPIA", "0088 TIROIDEOS"],
            },
            "Anticonceptivos y Salud Sexual": {
              codes: ["0002", "0070"],
              lineas: ["Anticonceptivos y Salud Sexual"],
              grupos: ["0002 ANTICONCEPTIVOS", "0070 DISFUNCIÓN ERÉCTIL"],
            },
          },
        },
        "Sistema Urinario": {
          subcategories: {
            "Antiespasmódicos Urinarios": {
              codes: ["0049"],
              lineas: ["Antiespasmódicos Urinarios"],
              grupos: ["0049 ANTIESPASMOD URINARIOS"],
            },
            "Otros Urinarios": {
              codes: ["0096"],
              lineas: ["Otros Urinarios"],
              grupos: ["0096 OTROS URINARIOS"],
            },
            "Prostáticos": {
              codes: ["0084"],
              lineas: ["Prostáticos"],
              grupos: ["0084 PROSTÁTICOS"],
            },
          },
        },
        "Sistema Oftálmico": {
          subcategories: {
            "Medicamentos Oftálmicos": {
              codes: ["0046", "0050", "0082", "0239"],
              lineas: ["Medicamentos Oftálmicos"],
              grupos: ["0046 ANTIBIÓTICOS OFTÁLMICOS", "0050 ANTIGLAUCOMA", "0082 OTROS OFTÁLMICOS", "0239 HUMECTANTE Y LUBRICAR CÓRNEA"],
            },
          },
        },
        "Analgésicos y Antiinflamatorios": {
          subcategories: {
            "Analgésicos Generales": {
              codes: ["0040", "0226"],
              lineas: ["Analgésicos Generales"],
              grupos: ["0040 ANALG GENERAL", "0226 ANALGES ANTITÉRMICOS / ANTIINFLAMATORIOS"],
            },
            "Analgésicos Especializados": {
              codes: ["0043", "0044"],
              lineas: ["Analgésicos Especializados"],
              grupos: ["0043 ANALG FEMENINOS", "0044 ANALG TÓPICOS"],
            },
            "Otros Analgésicos": {
              codes: ["0055", "0058", "0045"],
              lineas: ["Otros Analgésicos"],
              grupos: ["0055 ANTIJAQUECOSOS", "0058 ANTIRREUMÁTICO", "0045 ANESTÉSICOS LOCALES"],
            },
          },
        },
        "Antineoplásicos": {
          codes: ["0005"],
          lineas: ["Antineoplásicos"],
          grupos: ["0005 ANTINEOPLÁSICOS"],
        },
        "Vacunas y Diagnóstico": {
          codes: ["0014", "0069"],
          lineas: ["Vacunas y Diagnóstico"],
          grupos: ["0014 VACUNAS", "0069 DIAGNÓSTICO"],
        },
        "Suplementos y Vitaminas": {
          subcategories: {
            "Vitaminas y Minerales": {
              codes: ["0015", "0026", "0027", "0037", "0090", "0094"],
              lineas: ["Vitaminas y Minerales"],
              grupos: ["0015 VITAMINAS COMPLEJO B", "0026 CALCIOTERAPIA", "0027 VITAMINAS", "0037 ANTIANÉMICOS", "0090 VITAMINA A+D", "0094 SUPLEMENTOS MINERALES"],
            },
            "Suplementos Dietarios y Probioticos": {
              codes: ["0158", "0149", "0093", "0071"],
              lineas: ["Suplementos Dietarios y Probioticos"],
              grupos: ["0158 SUPLEMENTOS DIETARIOS", "0149 PROBIÓTICOS", "0093 ESTIMULANTES APETITO", "0071 ENDULZANTES"],
            },
          },
        },
      },
    },
    "Dermocosmética y Cuidado Personal": {
      subcategories: {
        "Cuidado Facial": {
          codes: ["0036", "0061", "0180"],
          lineas: ["Cuidado Facial"],
          grupos: ["0036 ANTIACNÉ", "0061 BÁLSAMO LABIAL", "0180 CREMA DE BELLEZA"],
        },
        "Cuidado Corporal": {
          codes: ["0057", "0083", "0062"],
          lineas: ["Cuidado Corporal"],
          grupos: ["0057 ANTIPRURIGINOSOS", "0083 POMADA COCEDURAS", "0062 CICATRIZANTES"],
        },
        "Cuidado Capilar": {
          codes: ["0066", "0160", "0161", "0175", "0176", "0177"],
          lineas: ["Cuidado Capilar"],
          grupos: ["0066 DERMO CAPILAR", "0160 SHAMPOO CAPILAR", "0161 BÁLSAMO/ACONDICIONADOR CAPILAR", "0175 TRATAMIENTO CAPILAR", "0176 STYLING/FIJADORES", "0177 TINTURA PARA EL CABELLO"],
        },
        "Protección Solar": {
          codes: ["0179"],
          lineas: ["Protección Solar"],
          grupos: ["0179 FILTROS SOLARES"],
        },
        "Cosméticos y Maquillaje": {
          codes: ["0150", "0183", "0184"],
          lineas: ["Cosméticos y Maquillaje"],
          grupos: ["0150 DERMOCOSMÉTICOS", "0183 COSMÉTICOS", "0184 ACCESORIOS COSMÉTICOS"],
        },
        "Fragancias": {
          codes: ["0185", "0186"],
          lineas: ["Fragancias"],
          grupos: ["0185 FRAGANCIA MASCULINA", "0186 FRAGANCIA FEMENINA"],
        },
        "Otros Cuidado Personal": {
          codes: ["0162", "0163", "0181", "0182", "0190"],
          lineas: ["Otros Cuidado Personal"],
          grupos: ["0162 DESODORANTES CORPORALES", "0163 JABONES ADULTOS", "0181 DEPILACIÓN", "0182 TALCOS CORPORALES", "0190 PROTECCIÓN FEMENINA"],
        },
      },
    },
    "Higiene Oral": {
      subcategories: {
        "Cuidado Dental": {
          codes: ["0165", "0166", "0167", "0170", "0063"],
          lineas: ["Cuidado Dental"],
          grupos: ["0165 PASTAS DENTALES", "0166 CEPILLOS DENTALES", "0167 SEDA/PALILLOS DENTALES", "0170 ENJUAGUES BUCALES", "0063 COLUTORIOS/PASTAS"],
        },
        "Prótesis Dental": {
          codes: ["0168", "0169"],
          lineas: ["Prótesis Dental"],
          grupos: ["0168 ADHESIVOS DENTADURA", "0169 LIMPIADORES PLACA DENTAL"],
        },
      },
    },
    "Cuidado Masculino": {
      subcategories: {
        "Afeitado y Post-Afeitado": {
          codes: ["0171", "0172", "0173"],
          lineas: ["Afeitado y Post-Afeitado"],
          grupos: ["0171 HOJAS/MÁQUINAS DE AFEITAR", "0172 CREMA DE AFEITAR", "0173 AFTER SHAVE"],
        },
      },
    },
    "Bebés y Maternidad": {
      subcategories: {
        "Alimentación Infantil": {
          codes: ["0076", "0202"],
          lineas: ["Alimentación Infantil"],
          grupos: ["0076 LECHES NIÑOS", "0202 ALIMENTO PARA BEBÉ"],
        },
        "Cuidado e Higiene del Bebé": {
          codes: ["0187", "0230", "0232", "0188", "0189"],
          lineas: ["Cuidado e Higiene del Bebé"],
          grupos: ["0187 ACCESORIOS BEBÉ", "0230 MAMADERA BEBÉ", "0232 CHUPETE BEBÉ", "0188 PERFUMERÍA BEBÉ", "0189 PAÑALES INFANTILES"],
        },
      },
    },
    "Ortopedia y Accesorios Médicos": {
      subcategories: {
        "Accesorios Médicos": {
          codes: ["0098", "0238", "0237", "0101"],
          lineas: ["Accesorios Médicos"],
          grupos: ["0098 ACCESORIOS MÉDICOS", "0238 JERINGA / AGUJA", "0237 ALGODÓN", "0101 AEROCÁMARAS"],
        },
        "Ortopedia": {
          codes: ["0099", "0156", "0227"],
          lineas: ["Ortopedia"],
          grupos: ["0099 ACCESORIOS ORTOPÉDICOS", "0156 ORTOPÉDICOS OTROS", "0227 GUATERO"],
        },
      },
    },
    "Mascotas": {
      subcategories: {
        "Medicamentos Veterinarios": {
          codes: ["0123", "0125", "0126", "0128", "0130", "0139", "0141"],
          lineas: ["Medicamentos Veterinarios"],
          grupos: ["0123 ANALGÉSICOS GENERALES VET", "0125 ANTIBIÓTICOS ORALES VET", "0126 ANTIBIÓTICOS TÓPICOS VET", "0128 ANTIDIARREICOS VET", "0130 ANTIPARASITARIOS VET", "0139 DIGESTIVOS VET", "0141 VITAMINAS VET"],
        },
        "Aseo y Belleza de Mascotas": {
          codes: ["0154"],
          lineas: ["Aseo y Belleza de Mascotas"],
          grupos: ["0154 MASCOTAS ASEO/BELLEZA"],
        },
      },
    },
    "Otros Productos": {
      subcategories: {
        "Primeros Auxilios": {
          codes: ["0109", "0155"],
          lineas: ["Primeros Auxilios"],
          grupos: ["0109 PRIMEROS AUXILIOS", "0155 PRIMEROS AUXILIOS"],
        },
        "Accesorios y Varios": {
          codes: ["0157", "0159", "0221", "0191"],
          lineas: ["Accesorios y Varios"],
          grupos: ["0157 ACCESORIO PODOLOGÍA", "0159 VARIOS MÉDICOS", "0221 TEXTILES", "0191 PAÑUELOS DESECHABLES"],
        },
        "Alimentos y Bebidas": {
          codes: ["0212", "0108"],
          lineas: ["Alimentos y Bebidas"],
          grupos: ["0212 BEBIDAS", "0108 OTROS ALIMENTOS"],
        },
        "Lubricantes e Intimidad": {
          codes: ["0113"],
          lineas: ["Lubricantes e Intimidad"],
          grupos: ["0113 LUBRICANTES ÍNTIMOS"],
        },
        "Productos Naturales": {
          codes: ["0236"],
          lineas: ["Productos Naturales"],
          grupos: ["0236 PROPÓLEO"],
        },
      },
    },
  };