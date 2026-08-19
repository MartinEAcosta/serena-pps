import { ActionableListItem } from '@shared/components/actionable-list/actionable-list.component';
import { SelectOption } from '../../forms/models/form.interfaces';
import { JobPositionData } from '@models/work-structure/work-structure.interfaces';

export interface SubstanceData {
  id?: string;
  job_position_relation: JobPositionData;
  substance_id: string;
  substance_name: string;
  substance_type?: string;
  usage_origin_type: string;
  usage_origin_others: string;
  application_method: string;
  application_method_others: string;
  annual_quantity: string;
  measurament_unit: string;
  protection_element: string;
  risk_informed: boolean;
  risk_training: boolean;
  replacement_studies_analysis: boolean;
  replacement_studies_analysis_desc: string;
  has_special_license: boolean;
  preventive_measure : string;
}

export interface SubstanceDataListItem extends Omit<SubstanceData, 'id'>, ActionableListItem {}

export const PreventiveMeasures : SelectOption[] = [
  {
    label: 'Política Documentada del Sistema de Gestión de Seguridad, Prevención y Salud Ocupacional',
    value: '1',
  },
  {
    label: 'Existencia del Servicio de Higiene y Seguridad del Trabajo y registros respectivos',
    value: '2',
  },
  {
    label: 'Existencia del Servicio de Medicina Laboral y registros respectivos',
    value: '3',
  },
  {
    label: 'Relevamiento General de Riesgos Laborales actualizado',
    value: '4',
  },
  {
    label: 'Documental actualizada de Análisis de Riesgos por puesto de trabajo con medidas preventivas. Normas de procedimiento de trabajo seguro actualizadas, de corresponder',
    value: '5',
  },
  {
    label: 'Nómina de trabajadores expuestos a cada uno de los agentes de riesgo (N.T.E.), actualizada',
    value: '6',
  },
  {
    label: 'Programa de Seguridad para las Obras Activas',
    value: '7',
  },
];


export const SubstanceCodes: SelectOption[] = [
  {
    label:
      'Asbestos (en todas sus formas, incluyendo Actinolita, Amosita, antofilita, crisotilo, crocidolita, tremolita) y las sustancias minerales (ej, talco o vermiculita) que contengan asbesto, también deben considerarse carcinógenas para los seres humanos',
    value: '40031',
  },
  { label: 'Berilio y sus compuestos', value: '40035' },
  { label: 'Benceno', value: '40036' },
  { label: 'Bifenilos policlorados', value: '40043' },
  { label: 'Cadmio y sus compuestos', value: '40044' },
  {
    label: 'Bis(clorometil)eter; clorometil metil eter (grado técnico)',
    value: '40054',
  },
  { label: 'Cloruro de vinilo', value: '40058' },
  { label: '1,2-Dicloropropano', value: '40071' },
  { label: 'Formaldehido', value: '40092' },
  { label: 'Producción de coque', value: '40096' },
  { label: 'Lindano', value: '40112' },
  { label: 'Compuestos de níquel', value: '40130' },
  { label: 'Óxido de etileno', value: '40136' },
  { label: 'Pentaclorofenol', value: '40142' },
  {
    label: 'Polvo de sílice cristalina, en forma de cuarzo o cristobalita',
    value: '40153',
  },
  { label: 'Orto-Toluidina', value: '40170' },
  { label: 'Tricloroetileno', value: '40173' },
  {
    label: 'Aceites minerales no tratados o medianamente tratados',
    value: '40201',
  },
  {
    label: 'Fabricación de Alcohol Isopropílico usando ácidos fuertes',
    value: '40202',
  },
  { label: 'Alquitrán de hulla', value: '40203' },
  { label: '4-Aminobifenilo', value: '40204' },
  { label: 'Producción de auramina', value: '40206' },
  { label: 'Bencidina', value: '40207' },
  { label: 'Compuestos de cromo (VI)', value: '40208' },
  { label: 'Gas Mostaza', value: '40210' },
  { label: 'Minería subterránea de la hematita', value: '40211' },
  {
    label:
      'Hollín (como se encuentra en la exposición ocupacional en el barrido de chimeneas)',
    value: '40212',
  },
  { label: 'Producción de magenta', value: '40213' },
  { label: '2-Naftilamina', value: '40214' },
  { label: 'Radón-222 y sus productos de decaimiento', value: '40216' },
  {
    label: 'Exposición ocupacional asociada al Proceso Acheson',
    value: '40220',
  },
  { label: '1,3-Butadieno', value: '40221' },
  { label: '2,3,4,7,8-Pentaclorodibenzofurano', value: '40222' },
  { label: '2,3,7,8-Tetraclorodibenzo-p-dioxina', value: '40223' },
  { label: '3,4,5,3´,4´-Pentaclorobifenilo (PCB-126)', value: '40224' },
  { label: '4,4´-Metilenbis(2-cloroanilina) (MOCA)', value: '40225' },
  { label: 'Arsénico y sus compuestos inorgánicos', value: '40226' },
  { label: 'Azatioprina', value: '40227' },
  { label: 'Benzo [a] Pireno', value: '40228' },
  {
    label:
      'Bifenilos Policlorados, como dioxina, con un Factor de Toxicidad Equivalente (TEF) de acuerdo con la OMS (PCB 77, 81, 105, 115, 118, 123, 126, 157, 167, 169, 189)',
    value: '40229',
  },
  { label: 'Busulfan', value: '40230' },
  { label: 'Ciclofosfamida', value: '40231' },
  { label: 'Ciclosporina', value: '40232' },
  { label: 'Clorambucil', value: '40233' },
  { label: 'Colorantes que se metabolizan a Bencidina', value: '40234' },
  { label: 'Destilación de alquitran de hulla', value: '40235' },
  { label: 'Erionita', value: '40236' },
  { label: 'Etopósido', value: '40237' },
  {
    label: 'Etopósido en combinación con cisplatino y bleomicina',
    value: '40238',
  },
  { label: 'Fibras anfíboles de fluoro-edenita', value: '40239' },
  { label: 'Fósforo-32, como fosfato', value: '40240' },
  { label: 'Gasificación del carbón', value: '40241' },
  { label: 'Humo de tabaco, ajeno', value: '40242' },
  { label: 'Iodos radiactivos, incluido el Iodo-131', value: '40243' },
  { label: 'Melfalán', value: '40244' },
  { label: 'Nieblas de ácidos inorgánicos fuertes', value: '40245' },
  {
    label:
      'N-Nitrosonornicotina (NNN) y 4-(N-Nitrosometilamina)-1-(3-piridil)-1-butanona (NNK)',
    value: '40246',
  },
  { label: 'Plutonio', value: '40247' },
  { label: 'Productos de fisión, incluido el Estroncio-90', value: '40248' },
  { label: 'Radio-224 y sus productos de decaimiento', value: '40249' },
  { label: 'Radio-226 y sus productos de decaimiento', value: '40250' },
  { label: 'Radio-228 y sus productos de decaimiento', value: '40251' },
  {
    label:
      'Radionucleidos, emisores de partículas Alfa, internamente depositados',
    value: '40252',
  },
  {
    label:
      'Radionucleidos, emisores de partículas Beta, internamente depositados',
    value: '40253',
  },
  { label: 'Torio-232 y sus productos de decaimiento', value: '40254' },
  { label: 'Aflatoxinas', value: '40255' },
  { label: 'Virus de la Hepatitis B (infección crónica)', value: '60021' },
  { label: 'Virus de la Hepatitis C (infección crónica)', value: '60022' },
  { label: 'Radiaciones ionizantes', value: '90002' },
  {
    label:
      'Radiación ultravioleta (longitudes de onda 100-400 nm abarcando las radiaciones UVA, UVB y UVC)',
    value: '90004',
  },
  { label: 'Radiación neutrónica', value: '90010' },
  { label: 'Rayos X y Radiación Gamma', value: '90011' },
];


export const SubstanceOriginCodes: SelectOption[] = [
  { label: 'Comercialización', value: '1' },
  { label: 'Aditivo', value: '2' },
  { label: 'Desinfectante', value: '3' },
  { label: 'Disolvente', value: '4' },
  { label: 'Pigmento', value: '5' },
  { label: 'Plastificante', value: '6' },
  { label: 'Componente de Equipo Industrial', value: '7' },
  { label: 'Componente de Equipo Médico', value: '8' },
  { label: 'Ambiental', value: '9' },
  { label: 'Originado en el Proceso Industrial', value: '10' },
  { label: 'Uso Médico', value: '11' },
  { label: 'Uso Farmacéutico', value: '12' },
  { label: 'Uso Terapéutico', value: '13' },
  { label: 'Uso Veterinario', value: '14' },
  { label: 'Uso forense', value: '15' },
  { label: 'Uso en Seguridad', value: '16' },
  { label: 'Uso Investigación', value: '17' },
  { label: 'Docencia', value: '18' },
  { label: 'Energía Nuclear', value: '19' },
  { label: 'Otros', value: '20' },
];

export const EmploymentModeCodes: SelectOption[] = [
  { label: 'Otros', value: '1' },
  { label: 'Materia Prima', value: '2' },
  { label: 'Producto intermedio', value: '3' },
  { label: 'Producto Final', value: '4' },
  { label: 'Almacenamiento', value: '5' },
  { label: 'Medicamento', value: '6' },
  { label: 'Comercialización', value: '7' },
  { label: 'Fraccionamiento', value: '8' },
  { label: 'Tratamiento / Diagnóstico', value: '9' },
  { label: 'Desecho de producción', value: '10' },
  { label: 'Pericial', value: '11' },
  { label: 'Tratamiento', value: '12' },
  { label: 'Diagnóstico', value: '13' },
  { label: 'Mediciones', value: '14' },
  { label: 'Control de Seguridad', value: '15' },
  { label: 'Mantenimiento', value: '16' },
  { label: 'Ventas', value: '17' },
  { label: 'Aeronavegación', value: '18' },
  { label: 'Minería', value: '19' },
];

export const UnitsOfQuantity: SelectOption[] = [
  { label: 'Gramos', value: 'gm' },
  { label: 'Toneladas', value: 'Ton' },
  { label: 'Kilogramos', value: 'kg' },
  { label: 'Metros Cúbicos', value: 'm3' },
  { label: 'Litros', value: 'lt' },
  { label: 'Centímetros Cúbicos', value: 'cm3' },
  { label: 'Otros', value: 'Otros' }
];

export const ProtectionElements: SelectOption[] = [
  { label: 'Gafas Plomadas', value: '1' },
  { label: 'Delantal Plomado', value: '2' },
  { label: 'Polainas', value: '3' },
  { label: 'Filtro Protección Solar', value: '4' },
  { label: 'Lentes con protección UV', value: '5' },
  { label: 'Arnés con cabo de vida', value: '6' },
  { label: 'Calzado de seguridad', value: '7' },
  { label: 'Casco', value: '8' },
  { label: 'Equipo de respiración autónoma', value: '9' },
  { label: 'Guantes', value: '10' },
  { label: 'Protección Auditiva', value: '11' },
  { label: 'Protección Facial', value: '12' },
  { label: 'Protección Respiratoria', value: '13' },
  { label: 'Protección Visual', value: '14' },
  { label: 'Ropa de trabajo', value: '15' },
  { label: 'Gorro con ala', value: '16' },
  { label: 'Casco con protección para el cuello', value: '17' },
  { label: 'Otros', value: '18' },
  { label: 'No Aplica', value: '19' },
  { label: 'No Entrega E.P.P', value: '20' },
];