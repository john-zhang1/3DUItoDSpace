import { ResourceData, ResourceType } from './three-models';

export const SITEDATASET: ResourceData[] = [
  {
    resourcetype: ResourceType.SITE,
    name: 'SHAREOK Repository',
    description: '<p>SHAREOK is the joint institutional repository for the University of Oklahoma Libraries (OU), Oklahoma State University Libraries (OSU), and the University of Central Oklahoma Max Chambers Library (UCO). It serves as the home for the intellectual output of those institutions, such as: digital theses and dissertations, faculty publications, open access publications, open educational resources, institution-specific content and much more.<p>If you would like to place your works in the institutional repository, please contact your library: OU, OSU, or UCO. Digital assets placed in the repository are available to a global audience, and search engine optimization techniques are used to increase their visibility to researchers and thus their impact on the global community.<p>If you are an OU student submitting a master\’s thesis or doctoral dissertation to the Graduate College via SHAREOK, please follow these instructions. For policies on embargoing your thesis or dissertation, please refer to the Graduate College Thesis/Dissertation Instruction Packet.<p>OSU students should follow the Thesis and Dissertation Guidelines posted in Canvas or email the Graduate College for more information.',
    parent: -1,
    children: [1, 6231, 47149],
    handleID: 0,
    uuid: '',
    strength: 89722
  }
]

export const COMMUNITYDATASET: ResourceData[] = [
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'The University of Oklahoma',
    description: 'To read about the policies that guide the use of the University of Oklahoma sub-communities and collections in SHAREOK, please download SHAREOK Institutional Repository: OU Policies and Guidelines from https://shareok.org/handle/11244/330071.',
    parent: 0,
    children: [300330, 301245, 33380, 54644, 34890, 15231, 54275, 21724, 324379, 28095, 52393, 329107, 301376, 10476, 7920, 47044, 23528],
    logo: '',
    handleID: 1,
    uuid: 'e781c503-6d9f-49b0-923b-2a96a35c90e2',
    strength: 45261
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'Oklahoma State University',
    parent: 0,
    children: [33372, 323833, 324824, 10460, 15478, 50889, 49191, 320247, 10465, 322079, 15285, 54463, 20926, 331304, 319582],
    logo: '',
    handleID: 6231,
    uuid: 'c31cddcc-2224-49cf-bb6e-3cfc0e812ff4',
    strength: 34461
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'University of Central Oklahoma',
    description: '<p>Founded in 1890 as one of the state\'s first institutions of higher learning, the University of Central Oklahoma exists to help students learn by providing transformative education experiences to students so that they may become productive, creative, ethical, and engaged citizens and leaders serving our global community.<p>UCO\'s SHAREOK community is maintained by Chambers Library\'s Digital Initiatives Working Group (DIWG). DIWG\'s mission is to create, enhance, preserve, and administer the library’s digital collections in the interest of furthering the library’s mission to connect the Central community to dynamic resources and services that support transformative learning. DIWG is focused on gathering materials created by UCO affiliates of a scholarly, creative, and/or research-related nature.<p>Chambers Library is committed to accurately and respectfully describing materials relating to underrepresented communities. Users encountering offensive or outdated terminology found on the library’s website, Central Search, SHAREOK, or elsewhere in the collection may submit a report to our metadata team. To learn more, visit the library’s Inclusive Metadata Initiative page.',
    parent: 0,
    children: [324290, 323718, 324291, 334573, 325294, 324284, 335238, 324286, 335107, 334575, 334574, 331084, 336455, 323776, 336514, 325399, 330731, 324287, 330016, 324289],
    logo: '',
    handleID: 47149,
    uuid: '400686ec-3d2e-4824-8d38-1627f44df743',
    strength: 1801
  },
  { 
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Academic Colleges, Departments, and Programs',
    parent: 1,
    children: [49359, 322082, 325572, 325573, 320353],
    logo: '',
    handleID: 300330,
    uuid: '1dd8188c-37cf-4229-9fbf-4b47ede9fb06',
    strength: 62
  },
  { 
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Administration, Administrative Offices',
    parent: 1,
    children: [321763, 321764, 321765],
    logo: '',
    handleID: 301245,
    uuid: '15a82407-7545-43ec-bcc1-49f963e80d97' ,
    strength: 1360
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - University Libraries',
    parent: 1,
    children: [301377, 45537, 317550, 325560],
    logo: '',
    handleID: 301376,
    uuid: 'ed1c2960-d3ea-48a0-8dac-fce5fe517dfb' ,
    strength: 78
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'Oklahoma Cooperative Extension Service',
    parent: 33372,
    children: [332381, 334975, 301785, 301786, 334999, 332519, 301783, 330758, 301788, 301789, 301799, 332375, 301798, 301800, 301804, 332365, 319806, 301791, 301801, 317859, 332415, 301802, 317885, 301803, 332402, 331287, 301790, 301794, 301795, 301796, 301784, 301805, 301806, 301807, 329120],
    logo: '',
    handleID: 301782,
    uuid: '5eaca81d-02d8-46a5-a601-7657c8b7c1d7',
    strength: 4130
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'Oklahoma Agricultural Experiment Station',
    parent: 6231,
    children: [331415, 319918, 302149],
    logo: '',
    handleID: 302148,
    uuid: '459aecde-7823-43d1-aa16-922e2cf7400b',
    strength: 1038
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - International Conference on Web Handling',
    parent: 6231,
    children: [321637],
    logo: '',
    handleID: 320247,
    uuid: '965364fe-39c1-4f42-a566-1d45421c8142',
    strength: 429
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Kappler\'s Indian Affairs',
    parent: 6231,
    children: [10466],
    logo: '',
    handleID: 10465,
    uuid: '28898eb1-6880-4510-b139-3dc9e9de73fc',
    strength: 8
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Research Data',
    parent: 1,
    children: [28096, 45394, 301996],
    logo: '',
    handleID: 28095,
    uuid: '7fd81391-e4f7-47dd-b0e4-2c535ff05ee5',
    strength: 24721
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Native American Resources',
    parent: 1,
    children: [35193],
    logo: '',
    handleID: 34890,
    uuid: '6c99d3d2-2353-4b47-ae7a-e2ceca0dd594',
    strength: 5609
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - IGSHPA Papers',
    parent: 6231,
    children: [301546, 336820, 49192],
    logo: '',
    handleID: 49191,
    uuid: 'eb57e0c4-bd3a-45fb-8f40-8bb3bde303a8',
    strength: 126
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Southern Forest Tree Improvement Conference',
    parent: 6231,
    children: [20927],
    logo: '',
    handleID: 20926,
    uuid: 'c7a6dfe3-7050-4513-b1a6-df882a17cfdd',
    strength: 59
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Patents Collection',
    parent: 6231,
    children: [15286],
    logo: '',
    handleID: 15285,
    uuid: 'c296ba08-6b24-4f62-aa9f-4e4c8455fcfb',
    strength: 189
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Agricultural Experiment Station and Cooperative Extension Service',
    parent: 6231,
    children: [302148, 301782],
    logo: '',
    handleID: 33372,
    uuid: 'be4695aa-abc3-4109-ad83-80158487a626',
    strength: 5168
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Faculty Papers',
    parent: 6231,
    children: [15479, 301818],
    logo: '',
    handleID: 15478,
    uuid: '8d5875ed-3408-4388-b9a0-2ec4b397a191',
    strength: 942
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Honors College',
    parent: 6231,
    children: [52252],
    logo: '',
    handleID: 50889,
    uuid: '4b17249b-1ca4-4ee4-b83f-09c769a9c310',
    strength: 752
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Quail/Prairie Grouse Conference Proceedings',
    parent: 6231,
    children: [54466, 54465],
    logo: '',
    handleID: 54463,
    uuid: '3a5ef28e-2ef6-498d-8501-66c335e6430a',
    strength: 3
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Institutes, Centers, Commissions, Labs, and Offices',
    parent: 1,
    children: [44801, 22701, 54645, 327343],
    logo: '',
    handleID: 54644,
    uuid: 'd658798e-5d5d-419c-a9ee-ee68245e0ffd',
    strength: 128
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Institute for the Study of Human Flourishing',
    parent: 54644,
    children: [22703, 22704, 22702],
    logo: '',
    handleID: 22701,
    uuid: '1cd73910-0de4-405c-93a2-b2d88bab56f1',
    strength: 70
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Health Sciences Center',
    parent: 1,
    children: [320364, 33381],
    logo: '',
    handleID: 33380,
    uuid: '69595680-4f42-45f6-8d59-f37b9cd7d78a',
    strength: 0
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - INHIGEO',
    parent: 54644,
    children: [44803, 44802],
    logo: '',
    handleID: 44801,
    uuid: 'a23ac7ec-7a58-46b8-9345-0a4965ec69d5',
    strength: 50
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Open Educational Resources (OER)',
    parent: 1,
    children: [21725, 302094, 302095, 44883],
    logo: '',
    handleID: 21724,
    uuid: '6b37912d-39aa-4672-8448-5bc28300586e',
    strength: 108
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Oklahoma Supercomputing and Cyberinfrastructure',
    parent: 1,
    children: [15262, 15268, 45029, 15446, 47163, 17337, 15461, 15462],
    logo: '',
    handleID: 15231,
    uuid: '3a7c7050-13a0-44fe-8de8-8e8613db6228',
    strength: 89
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Tulsa Schusterman Center',
    parent: 1,
    children: [324171, 323816, 325646, 52394, 52398, 52395, 52397, 52396, 324958],
    logo: '',
    handleID: 52393,
    uuid: 'f79f8084-55b9-4903-ac28-0787d7890f37',
    strength: 108
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Oklahoma Transportation Resources / Oklahoma Transportation Library',
    parent: 1,
    children: [54276],
    logo: '',
    handleID: 54275,
    uuid: '09f825f7-55bf-4c98-9b7e-b2c2ec85c47e',
    strength: 372
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Electronic Theses and Dissertations',
    parent: 6231,
    children: [10462, 14248, 10464],
    logo: '',
    handleID: 10460,
    uuid: '830ffd63-1dd0-42f8-ba76-be5b48905d11',
    strength: 26485
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Laboratories of Molecular Anthropology and Microbiome Research (LMAMR)',
    parent: 54644,
    children: [54646],
    logo: '',
    handleID: 54645,
    uuid: '7440dc82-6cdf-4d57-8a99-30bf90611e9f',
    strength: 5
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Undergraduate Research',
    parent: 6231,
    children: [321016, 323326, 329033, 335213, 330158, 319583],
    logo: '',
    handleID: 319582,
    uuid: 'cdddf5b1-36d1-4d56-b23f-3818c34ace5c',
    strength: 165
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Office of the President',
    parent: 301245,
    children: [],
    logo: '',
    handleID: 321764,
    uuid: '2ded3a6e-76d8-4fb2-9b6e-63289805485c',
    strength: 0
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Office of the Senior Vice President and Provost',
    parent: 301245,
    children: [],
    logo: '',
    handleID: 321765,
    uuid: '2e77a520-5084-406d-b7a0-6097dbdd752e',
    strength: 0
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Board of Regents',
    parent: 301245,
    children: [325266],
    logo: '',
    handleID: 321763,
    uuid: '5dfde4fe-daf9-4e8c-8645-b6ace422dc94',
    strength: 1360
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Open Educational Resources',
    parent: 6231,
    children: [322080],
    logo: '',
    handleID: 322079,
    uuid: '6417414f-0450-4ee1-b4c7-07b253561faf',
    strength: 4
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Ruth Knee Institute for Transformative Scholarship',
    parent: 54644,
    children: [327344],
    logo: '',
    handleID: 327343,
    uuid: '18dee86e-29c9-4d0d-86c1-867f5bb2dcb0',
    strength: 3
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'UCO - Graduate Works and Theses',
    parent: 47149,
    children: [324596, 324801],
    logo: '',
    handleID: 323718,
    uuid: '5398b9b7-ebb1-4647-b91b-9240b40cfa41',
    strength: 661
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Center for Health Sciences',
    parent: 6231,
    children: [324279, 323834, 324183],
    logo: '',
    handleID: 323833,
    uuid: '7d18a21e-c7a6-4189-827a-72d5cd87553f',
    strength: 136
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Undergraduate Student Publications',
    parent: 1,
    children: [329108, 335876, 330097, 329114, 329115, 331258, 329116],
    logo: '',
    handleID: 329107,
    uuid: '7b7054ea-98a1-459b-9c01-d7bedb0a243b',
    strength: 251
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'UCO - Undergraduate Works',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 324291,
    uuid: '4d87a9c4-df6f-4c01-96ab-7fd0e4dc878e',
    strength: 0
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'UCO - Faculty and Staff Works',
    parent: 47149,
    children: [325596],
    logo: '',
    handleID: 324290,
    uuid: 'd6f24d66-0091-44e7-92fb-6ac41a1d656d',
    strength: 38
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - OU Press',
    parent: 1,
    children: [324380],
    logo: '',
    handleID: 324379,
    uuid: '3d1ff024-d9e6-4cbf-82a8-ccfbaee69dfe',
    strength: 4
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OU - Student Journals',
    parent: 329107,
    children: [329109, 329110, 329111, 329112, 329113],
    logo: '',
    handleID: 329108,
    uuid: 'deb670ee-9830-400b-afd0-ccb63874293c',
    strength: 178
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Coalition for Advancing Digital Research & Education (CADRE)',
    parent: 6231,
    children: [324825],
    logo: '',
    handleID: 324824,
    uuid: 'bf4ded5a-250a-4846-a4ae-2bdc2bab61f9',
    strength: 12
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'OSU - Under Development',
    parent: 6231,
    children: [332330],
    logo: '',
    handleID: 331304,
    uuid: '4d2a5c8b-8e3a-4169-90a0-8f762e19e46d',
    strength: 1
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'Entity - Publications',
    parent: 1,
    children: [400008],
    logo: '',
    handleID: 400001,
    uuid: '0958c910-2037-42a9-81c7-dca80e3892b4',
    strength: 1
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'Entity - Related Objects',
    parent: 1,
    children: [400007, 400009, 400010],
    logo: '',
    handleID: 400002,
    uuid: '692c3042-19df-4b62-91e9-99c040227999',
    strength: 1
  },
  {
    resourcetype: ResourceType.COMMUNITY,
    name: 'Entity - Compound Journals',
    parent: 1,
    children: [400004, 400005, 400006],
    logo: '',
    handleID: 400003,
    uuid: '8b632938-77c2-487c-81f0-e804f63e68e6',
    strength: 1
  }
];

export const COLLECTIONDATASET: ResourceData[] = [
  {
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - University Libraries - Faculty Newsletters',
    parent: 301376,
    children: [],
    logo: '',
    handleID: 301377,
    uuid: '7e3d6591-2beb-436d-a34d-6fe9b4471b77',
    strength: 45
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Proceedings of the IGSHPA Research Track 2018',
    parent: 49191,
    children: [],
    logo: '',
    handleID: 301546,
    uuid: 'd1684a5c-ab28-4340-ab39-52bccda7d66e',
    strength: 49
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Animal Science',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301798,
    uuid: 'aee19188-8962-4b1a-8036-393a29e3174e',
    strength: 175
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Cow/calf corner',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301783,
    uuid: '3a6a63bd-8cf4-49fa-a0bd-05b6fd035d4c',
    strength: 364
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OSU - Research Data',
    parent: 15478,
    children: [],
    logo: '',
    handleID: 301818,
    uuid: 'b3181aed-6994-4a4b-b247-d08b2dd91947',
    strength: 9
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Pesticide reports',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301784,
    uuid: 'db3486d6-8852-4374-9217-4977668cebff',
    strength: 95
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Engineering success',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301788,
    uuid: '5db5106b-3e35-4f92-96a5-1fc6c2850614',
    strength: 9
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Food technology',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301791,
    uuid: '8657af95-e470-4535-bcad-9905d6f5e240',
    strength: 139
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Ambassadors newsletter',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301785,
    uuid: '4c90a7e2-7794-4679-8cc1-d293530fc973',
    strength: 10
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Cotton comments',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301786,
    uuid: '6fe983f0-b653-4e36-a02c-36a9aab336d6',
    strength: 105
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Equine news',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301789,
    uuid: 'd78ab47e-daaf-4726-b46c-9352ac0d873a',
    strength: 7
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Focus',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301790,
    uuid: '08a104d4-d39c-4961-adcf-99528c60f437',
    strength: 27
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Plant disease and insect advisory / Pest E-alerts',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301805,
    uuid: '45faae7e-1ec7-44f5-b6ee-e63d2bc1006a',
    strength: 553
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - Oklahoma Aerial Photographs',
    parent: 28095,
    children: [],
    logo: '',
    handleID: 301996,
    uuid: '70a820b2-978c-4632-b20e-c8f4ff96b6e4',
    strength: 14100
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Horticulture tips',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301794,
    uuid: 'b7d55195-6a91-4bb4-b4ab-c6b9ad425790',
    strength: 150
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Le Vigneron',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301795,
    uuid: '9a561c5c-a5d2-4ac7-ab61-730361639560',
    strength: 22
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Agricultural Economics',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301799,
    uuid: '7dbbd0aa-c200-42ad-b5ae-a00df88ff410',
    strength: 305
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Biosystems and Agricultural Engineering',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301800,
    uuid: '59ff01ce-5dec-46ec-a4bb-cc7c4fd08bed',
    strength: 109
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Master cattleman quarterly',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301796,
    uuid: '76893827-95af-4ad8-84ac-cc370799f3c9',
    strength: 32
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Horticulture and Landscape Architecture',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301801,
    uuid: '5732c049-5022-4e3f-ba8e-bddf8060146d',
    strength: 169
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Natural Resource Ecology and Management',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301802,
    uuid: '98200ab9-8958-4ec7-896d-970edbbc2a13',
    strength: 116
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - College of Veterinary Medicine',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301804,
    uuid: '02d5a53f-1e74-4cfb-9a13-7f05dcb93fa2',
    strength: 23
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Southern Regional Aquaculture Center',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301803,
    uuid: '7a1fb8e4-68c6-4b1e-91bc-400a2b4075e0',
    strength: 36
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - OER - Ancillary Materials',
    parent: 21724,
    children: [],
    logo: '',
    handleID: 302094,
    uuid: '46f1586e-1747-4d33-98b2-7d5c08a611f2',
    strength: 46
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Poultry practices',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301806,
    uuid: '62d70428-130b-480f-a796-13fa56229605',
    strength: 10
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Production technology report',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 301807,
    uuid: '219ec1e9-0d09-4b7a-a8f1-3cdc018c8cc8',
    strength: 29
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - OER - Book Chapters',
    parent: 21724,
    children: [],
    logo: '',
    handleID: 302095,
    uuid: '281c1706-b007-47ba-9b4e-e0c7a1b60ca6',
    strength: 3
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Technical Bulletin',
    parent: 302148,
    children: [],
    logo: '',
    handleID: 302149,
    uuid: '18674538-8f86-4859-832c-8e7f12a82534',
    strength: 171
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Entomology and Plant Pathology',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 319806,
    uuid: '02f08196-a69c-4ab0-a612-cbacd4a68389',
    strength: 124
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Mimeographed Circular',
    parent: 302148,
    children: [],
    logo: '',
    handleID: 319918,
    uuid: 'a17d5dcd-7e9a-4ab0-a71b-78c8c76f9815',
    strength: 55
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - University Libraries - Sooner Horizon',
    parent: 301376,
    children: [],
    logo: '',
    handleID: 317550,
    uuid: 'e31b8e22-9140-44f5-bd4c-34201797db37',
    strength: 14
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Telesis',
    parent: 300330,
    children: [],
    logo: '',
    handleID: 320353,
    uuid: 'cca3af7a-f4b3-4c48-91da-162c32b4d6b9',
    strength: 7
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - HSC - Graduate Student Publications',
    parent: 33380,
    children: [],
    logo: '',
    handleID: 320364,
    uuid: '58605353-a82f-4e9e-9b2f-a688efd36288',
    strength: 0
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Index',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 317859,
    uuid: 'abae6a46-318a-4e0e-8728-d32387bdaf85',
    strength: 25
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Plant and Soil Sciences',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 317885,
    uuid: 'cd374211-2335-4d62-a196-727a892e4bbb',
    strength: 162
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'HHMI Life Science Freshman Research Scholars',
    parent: 319582,
    children: [],
    logo: '',
    handleID: 321016,
    uuid: '1fa0cbc1-88dc-4b5c-b334-7923e44c38ad',
    strength: 23
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - Faculty and Staff Publications',
    parent: 1,
    children: [],
    logo: '',
    handleID: 7920,
    uuid: 'b5b4c0fc-d955-42b7-909c-5e8f498d8a7a',
    strength: 1399
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OSU Dissertations',
    parent: 10460,
    children: [],
    logo: '',
    handleID: 10462,
    uuid: '3200568c-fd41-4128-92d3-c2756c7af3ef',
    strength: 10302
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OSU Theses',
    parent: 10460,
    children: [],
    logo: '',
    handleID: 10464,
    uuid: '3dcee70f-addd-498c-93c8-de8c5da70168',
    strength: 15449
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Indian Affairs: Laws and Treaties',
    parent: 10465,
    children: [],
    logo: '',
    handleID: 10466,
    uuid: '4007fac9-4fcc-42a5-a1d2-8d8896fc0b0f',
    strength: 8
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - Dissertations',
    parent: 1,
    children: [],
    logo: '',
    handleID: 10476,
    uuid: 'b55afbbf-fc3f-4159-a38e-e8533c32685d',
    strength: 9086
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OSU Master\'s Report',
    parent: 10460,
    children: [],
    logo: '',
    handleID: 14248,
    uuid: 'a94ff07d-6f0e-4fda-83ed-1d278799b066',
    strength: 734
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'ACI-REF Virtual Residency',
    parent: 15231,
    children: [],
    logo: '',
    handleID: 15262,
    uuid: 'f2d21d11-57f4-461d-b69b-ed80c93c632b',
    strength: 14
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'General Supercomputing / Cyberinfrastructure',
    parent: 15231,
    children: [],
    logo: '',
    handleID: 15268,
    uuid: '359daf87-d736-4603-9442-73bddd2f60bd',
    strength: 31
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'General Supercomputing / Cyberinfrastructure',
    parent: 15285,
    children: [],
    logo: '',
    handleID: 15286,
    uuid: 'b6bd37c9-eb96-4078-b7f7-5d76748110a1',
    strength: 189
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Oklahoma Supercomputing Symposium',
    parent: 15231,
    children: [],
    logo: '',
    handleID: 15446,
    uuid: 'cc99f79c-c440-4879-b9fc-66c2afa2b175',
    strength: 31
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU Supercomputing Center for Education & Research',
    parent: 15231,
    children: [],
    logo: '',
    handleID: 15461,
    uuid: '7e19f0e6-fa2e-4bcf-8e98-d489b9145ca8',
    strength: 1
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'XSEDE Publications',
    parent: 15231,
    children: [],
    logo: '',
    handleID: 15462,
    uuid: 'ab46c8ff-3411-42d8-9a73-657382f66eed',
    strength: 7
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OSU - Faculty and Staff Publications',
    parent: 15478,
    children: [],
    logo: '',
    handleID: 15479,
    uuid: '750fde81-ef62-49ac-81fd-0cc6a0c8bf05',
    strength: 933
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OSU High Performance Computing Center',
    parent: 15231,
    children: [],
    logo: '',
    handleID: 17337,
    uuid: '40836e76-39ab-4480-89fd-82f3cd5596ab',
    strength: 4
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Proceedings of the 27th Southern Forest Tree Improvement Conference',
    parent: 20926,
    children: [],
    logo: '',
    handleID: 20927,
    uuid: '3bdcf85a-56c6-4a0a-a8ae-ed0777e72bfb',
    strength: 59
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Lynx Open Ed',
    parent: 21724,
    children: [],
    logo: '',
    handleID: 21725,
    uuid: 'afa9de59-a6e3-4113-8052-4e767b6cd553',
    strength: 47
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Moral Self Archive',
    parent: 22701,
    children: [],
    logo: '',
    handleID: 22702,
    uuid: 'cfc3efa9-0000-4462-821b-29d7cc9dc986',
    strength: 61
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'ISHF Conferences',
    parent: 22701,
    children: [],
    logo: '',
    handleID: 22703,
    uuid: '3a941294-b70f-4504-8c7a-5bdae2a13e23',
    strength: 0
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'ISHF Resources',
    parent: 22701,
    children: [],
    logo: '',
    handleID: 22704,
    uuid: '48d75d2f-9b3b-4814-ba00-305b5ce8d3e2',
    strength: 9
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - Theses',
    parent: 1,
    children: [],
    logo: '',
    handleID: 23528,
    uuid: 'c277530b-5e3d-43fe-97f3-9a53ec1062ae',
    strength: 1868
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Citizen Science Soil Collection Program',
    parent: 28095,
    children: [],
    logo: '',
    handleID: 28096,
    uuid: 'a7693079-f4e3-400b-8ed1-2ffb80b8e550',
    strength: 10615
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - HSC - The Robert M. Bird Health Sciences Library',
    parent: 33380,
    children: [],
    logo: '',
    handleID: 33381,
    uuid: '675ec47d-79de-4301-bd7a-0cfe54d96361',
    strength: 0
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'American Indian Documents in the Congressional Serial Set 1817-1899',
    parent: 34890,
    children: [],
    logo: '',
    handleID: 35193,
    uuid: '20e8bc27-38d8-4fb7-8148-ef0840376d23',
    strength: 5609
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'INHIGEO Newsletter / Annual Record',
    parent: 44801,
    children: [],
    logo: '',
    handleID: 44802,
    uuid: 'a9639b1e-05b8-4564-8793-5e133fd5494c',
    strength: 50
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'INHIGEO Field Guides',
    parent: 44801,
    children: [],
    logo: '',
    handleID: 44803,
    uuid: 'ed952edb-0471-4cbc-879e-1804acf5a25f',
    strength: 0
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - OER - Textbooks',
    parent: 21724,
    children: [],
    logo: '',
    handleID: 44883,
    uuid: 'a9a069ea-a1b8-4717-80af-06e951f6cd3a',
    strength: 12
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Oklahoma EPSCoR',
    parent: 15231,
    children: [],
    logo: '',
    handleID: 45029,
    uuid: '7143576c-a964-4f06-b494-201fc87d0176',
    strength: 0
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'General Research Data',
    parent: 28095,
    children: [],
    logo: '',
    handleID: 45394,
    uuid: '6401f134-66cc-4ff7-88d7-9f39e3e43e18',
    strength: 6
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - University Libraries - General Content',
    parent: 301376,
    children: [],
    logo: '',
    handleID: 45537,
    uuid: 'e890df62-bbc5-483b-aeca-1f1f30618f40',
    strength: 9
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - Graduate Student Publications',
    parent: 1,
    children: [],
    logo: '',
    handleID: 47044,
    uuid: 'eef06b97-b9c3-4236-82d1-6f961bc8fb4b',
    strength: 36
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OneOklahoma Friction Free Network',
    parent: 15231,
    children: [],
    logo: '',
    handleID: 47163,
    uuid: 'c4a27813-256f-4416-9511-4426b0414b60',
    strength: 1
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Proceedings of the IGSHPA Technical/Research Conference and Expo 2017',
    parent: 49191,
    children: [],
    logo: '',
    handleID: 49192,
    uuid: '274dd9a4-ef66-47c7-a165-8eb4d1d77f0a',
    strength: 44
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'American Organ Institute - Windlines (OU School of Music)',
    parent: 300330,
    children: [],
    logo: '',
    handleID: 49359,
    uuid: 'f6d427f8-622a-47b4-a181-a6b8404f83a3',
    strength: 22
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OSU - Honors College Theses',
    parent: 50889,
    children: [],
    logo: '',
    handleID: 52252,
    uuid: 'c46527fa-72dd-4733-aadf-a1d505fb8592',
    strength: 752
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - Center of Applied Research for Nonprofit Organizations',
    parent: 52393,
    children: [],
    logo: '',
    handleID: 52394,
    uuid: 'c350938d-f948-4566-b0d9-1fbbd53bd1cb',
    strength: 1
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU Schusterman Library',
    parent: 52393,
    children: [],
    logo: '',
    handleID: 52395,
    uuid: 'ce8649f3-bd29-4326-942c-9e9cf8023705',
    strength: 1
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU-Tulsa Digital Library',
    parent: 52393,
    children: [],
    logo: '',
    handleID: 52396,
    uuid: '9f50d3c4-1592-45d2-9a6a-280eaf3a0ecd',
    strength: 0
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU Urban Design Studio Professional Projects',
    parent: 52393,
    children: [],
    logo: '',
    handleID: 52397,
    uuid: '772411bd-231c-460f-af43-7b9f449e7828',
    strength: 0
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - The Bulletin of the Tulsa County Medical Society',
    parent: 52393,
    children: [],
    logo: '',
    handleID: 52398,
    uuid: '5aa9db5b-4225-4d54-afd4-b6b7f71f8510',
    strength: 23
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Research Highlighters and Reports - ODOT Office of Research & Implementation',
    parent: 54275,
    children: [],
    logo: '',
    handleID: 54276,
    uuid: '42ea7768-2c13-4d67-931c-84b1581cf154',
    strength: 372
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Proceedings of the Prairie Grouse Symposium',
    parent: 54463,
    children: [],
    logo: '',
    handleID: 54465,
    uuid: '3f929564-5b94-4abb-832f-37735b58842c',
    strength: 1
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Proceedings of the National Bobwhite Quail Symposiums',
    parent: 54463,
    children: [],
    logo: '',
    handleID: 54466,
    uuid: 'f97d477a-6e2f-4306-a129-92d94bd077a3',
    strength: 2
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'LMAMR Faculty Publications',
    parent: 54645,
    children: [],
    logo: '',
    handleID: 54646,
    uuid: 'e9025201-30fc-4301-a9fe-b21e75da4e23',
    strength: 5
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Wentz Research Scholars',
    parent: 319582,
    children: [],
    logo: '',
    handleID: 319583,
    uuid: 'd5550647-9dbf-49e7-8977-4fa1bd93e1c2',
    strength: 68
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Proceedings of the International Conference on Web Handling',
    parent: 320247,
    children: [],
    logo: '',
    handleID: 321637,
    uuid: 'e81b6824-1983-44a3-8b77-88e023db97d2',
    strength: 429
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Open Textbooks',
    parent: 322079,
    children: [],
    logo: '',
    handleID: 322080,
    uuid: '8c707360-a374-487d-9448-e660ad117b3d',
    strength: 4
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'College of Architecture Conference Proceedings',
    parent: 300330,
    children: [],
    logo: '',
    handleID: 322082,
    uuid: 'bc949761-5ab7-4f34-9548-cb8a4ec8a9a4',
    strength: 28
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Special Collections Finding Aids',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 330731,
    uuid: '096d9d24-df1c-4445-964f-1879b7248914',
    strength: 10
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Undergraduate Summer Research Expo',
    parent: 319582,
    children: [],
    logo: '',
    handleID: 330158,
    uuid: '5fb38cef-8ace-4f5f-8ab2-b97602c88af1',
    strength: 8
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'E-Series',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 330758,
    uuid: 'd1feb553-5dec-4af4-a3f5-5e9df9afe0f2',
    strength: 506
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'McNair Scholars',
    parent: 319582,
    children: [],
    logo: '',
    handleID: 323326,
    uuid: '5c0093a5-ff85-4425-9f2a-28b91c0282f5',
    strength: 4
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Research, evaluation, and reports',
    parent: 327343,
    children: [],
    logo: '',
    handleID: 327344,
    uuid: 'e7b63828-db4e-4517-844d-79e90d332dc8',
    strength: 3
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Oklahoma Fashion Museum Collection',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 323776,
    uuid: 'eb7b9115-5d77-4bc3-90dd-182893732447',
    strength: 16
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Development of the Tulsa Medical College: An Oral History Project',
    parent: 52393,
    children: [],
    logo: '',
    handleID: 323816,
    uuid: '218ad9da-452d-457b-ba1a-3d9912955f4c',
    strength: 28
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Research Day 2019',
    parent: 323833,
    children: [],
    logo: '',
    handleID: 323834,
    uuid: 'ec069d18-1f7b-474e-8c13-a9e57776b8b5',
    strength: 49
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Oklahoma Louis Stokes Alliance for Minority Participation (OK-LSAMP) Program',
    parent: 319582,
    children: [],
    logo: '',
    handleID: 329033,
    uuid: '0d2998a5-f379-442f-8a30-c35ff5e3bb4a',
    strength: 38
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'DĀNESH: The OU Undergraduate Journal of Iranian Studies',
    parent: 329108,
    children: [],
    logo: '',
    handleID: 329109,
    uuid: 'a47f90b8-9a0b-411e-ab3f-448e6fa13bac',
    strength: 39
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - Exploring U.S. History',
    parent: 329107,
    children: [],
    logo: '',
    handleID: 329115,
    uuid: '390d1284-a818-4ac8-995c-3e7ff9b42c6b',
    strength: 42
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - Other Undergraduate Student Scholarship',
    parent: 329107,
    children: [],
    logo: '',
    handleID: 329116,
    uuid: '3e72886e-ca32-47c7-a53a-69b0c98fae9a',
    strength: 5
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Clinical Vignette Symposium 2020',
    parent: 52393,
    children: [],
    logo: '',
    handleID: 324171,
    uuid: '7a04149e-e6b9-40fb-82fd-453e346cdf9f',
    strength: 23
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Research Day 2020',
    parent: 323833,
    children: [],
    logo: '',
    handleID: 324183,
    uuid: 'e3de50cf-bdc1-4beb-9b15-d193fc819917',
    strength: 86
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Herland Voice Newsletter Archive',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 324286,
    uuid: '1d9076c1-8924-4105-9b34-8bf0b5d9c88c',
    strength: 321
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - STLR Initiative Archive',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 324287,
    uuid: 'b9fc374b-4724-4c84-810d-4b3e20dd4ba3',
    strength: 57
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Faculty and Staff Publications',
    parent: 323833,
    children: [],
    logo: '',
    handleID: 324279,
    uuid: 'd9d9adf7-6eac-4d65-b9d7-a0ac91a82770',
    strength: 1
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Dimensions Magazine Archive',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 324284,
    uuid: '7ff5cb44-ca57-41cb-ae49-c036b8a5733b',
    strength: 70
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Vista Student Newspaper Archive',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 324289,
    uuid: '028e4a2e-8671-4bcf-ac97-5a131496583a',
    strength: 126
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - OU Press - Open Access Monographs',
    parent: 324379,
    children: [],
    logo: '',
    handleID: 324380,
    uuid: '599209a2-d1a1-48a9-917a-7590ab8e8492',
    strength: 4
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'The Journal of Global Affairs',
    parent: 329108,
    children: [],
    logo: '',
    handleID: 329110,
    uuid: 'eb34790d-b445-41d9-800e-44f561556027',
    strength: 26
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'The Virtues of Study Abroad',
    parent: 329108,
    children: [],
    logo: '',
    handleID: 329111,
    uuid: 'cf4317b0-4eea-4b1a-8037-d6329fabb7a2',
    strength: 30
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'THURJ: The Honors Undergraduate Research Journal',
    parent: 329108,
    children: [],
    logo: '',
    handleID: 329112,
    uuid: 'b2936fc3-9f0c-448f-8f5f-73a1428d631d',
    strength: 21
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'University of Oklahoma Historical Journal',
    parent: 329108,
    children: [],
    logo: '',
    handleID: 329113,
    uuid: '9d9bef03-95eb-4dfe-805d-1bb984735e2d',
    strength: 62
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - Emerging Scholars',
    parent: 329107,
    children: [],
    logo: '',
    handleID: 329114,
    uuid: '21498434-c26f-433c-9d19-189f335e217c',
    strength: 20
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Water quality update',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 329120,
    uuid: '08a0ee98-4f89-46fc-ae61-834a28d05eae',
    strength: 29
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Graduate Theses',
    parent: 323718,
    children: [],
    logo: '',
    handleID: 324596,
    uuid: '80e20120-6fc4-40cc-9ad8-03210edfba4c',
    strength: 661
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Graduate Works',
    parent: 323718,
    children: [],
    logo: '',
    handleID: 324801,
    uuid: '09f4c1c6-1c66-45ab-a278-b7e6f02ac598',
    strength: 0
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'CADRE Conference Presentations',
    parent: 324824,
    children: [],
    logo: '',
    handleID: 324825,
    uuid: 'b3f4632b-9855-4a22-b209-5fa9de1f5b64',
    strength: 12
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU-Tulsa Research Forum 2020',
    parent: 52393,
    children: [],
    logo: '',
    handleID: 324958,
    uuid: '65f7cc4e-1f58-477d-9ce2-adc90d5fd20f',
    strength: 19
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Board of Regents Minutes',
    parent: 321763,
    children: [],
    logo: '',
    handleID: 325266,
    uuid: 'e0440167-fd08-4354-96a7-c10fa00ec30e',
    strength: 1360
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Design Annual Archive',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 325294,
    uuid: 'a33f3ed6-4c69-4241-833c-45dc252c94fb',
    strength: 6
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Sidney C. Bray Collection: Schools at War Scrapbooks',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 325399,
    uuid: '91cd50fa-362f-4177-b067-d83c0830d8df',
    strength: 260
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - University Libraries - Tutorial Videos',
    parent: 301376,
    children: [],
    logo: '',
    handleID: 325560,
    uuid: '19ee04bf-48df-4b36-b11e-8e79c2ddb2c5',
    strength: 10
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'College, Department, and Program Resources',
    parent: 300330,
    children: [],
    logo: '',
    handleID: 325572,
    uuid: '852c9498-3311-4d02-bf69-5455efd1d8eb',
    strength: 5
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Drosophila Information Service',
    parent: 300330,
    children: [],
    logo: '',
    handleID: 325573,
    uuid: '518132ad-d5a3-4f6e-9f18-7d1b5346e2ad',
    strength: 0
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Faculty and Staff Publications',
    parent: 324290,
    children: [],
    logo: '',
    handleID: 325596,
    uuid: '81a29afd-218d-4b4d-b09f-ef87275e7791',
    strength: 38
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Oklahoma Chapter of the American College of Physicians Virtual Meeting 2020',
    parent: 52393,
    children: [],
    logo: '',
    handleID: 325646,
    uuid: '443da9c9-9b93-4aae-9b76-6532d5c6112a',
    strength: 13
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Metadata Justice in Oklahoma Libraries & Archives Symposium Proceedings',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 336455,
    uuid: '7a700878-03fb-4506-8a66-9909bb896010',
    strength: 7
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Melton Zine Library',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 331084,
    uuid: 'cfc23b42-8c4e-46ff-8157-7698d53b50df',
    strength: 2
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Oklahoma Townsite Case Files',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 336514,
    uuid: '6463b69e-b478-4caa-974e-951184541ce5',
    strength: 1
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Bulletins',
    parent: 302148,
    children: [],
    logo: '',
    handleID: 331415,
    uuid: '7037a48a-b112-4f04-939a-6e47d8ccce3e',
    strength: 812
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - MCTE 3151 Molecular, Cellular and Tissue Engineering Lab',
    parent: 329107,
    children: [],
    logo: '',
    handleID: 331258,
    uuid: '616ba5ab-42e0-4314-9da8-a58f0916f864',
    strength: 1
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Water Research and Extension Center',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 331287,
    uuid: 'dc2c6bcb-bbf7-4d16-9412-52fa42e64dd3',
    strength: 4
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Current Report',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 332365,
    uuid: '50f55768-399d-4aed-bbf9-f9bcad6fa19b',
    strength: 446
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - Agricultural Education, Communications and Leadership',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 332375,
    uuid: 'dcdeceb1-1398-4d6a-b2cd-26f80b64edec',
    strength: 5
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: '4-H Youth Development',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 332381,
    uuid: '61faa572-4381-4e45-9a23-96a0bc286bef',
    strength: 1
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact Sheets - L-Series',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 332415,
    uuid: 'dc45f4bd-1516-430a-8b1a-6ffa49741ef1',
    strength: 40
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Development',
    parent: 331304,
    children: [],
    logo: '',
    handleID: 332330,
    uuid: 'b94ca23b-4bd7-4477-a3ad-7c796611ed3a',
    strength: 1
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Fact sheets - T-Series',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 332402,
    uuid: '4408e5ed-99f0-4f40-831c-4383f2dc49c6',
    strength: 259
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Proceedings of the IGSHPA Research Track 2022',
    parent: 49191,
    children: [],
    logo: '',
    handleID: 336820,
    uuid: '62d2ac65-b548-4210-9af0-75e644fee1f2',
    strength: 33
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - University History',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 330016,
    uuid: '6a2744e5-4dca-4b3e-9eed-0ebbea0c0ce3',
    strength: 202
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'COVID-19 Response',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 332519,
    uuid: '5ea967a7-98fb-419b-b2e9-0b1ed96210b5',
    strength: 4
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Library Policies Archive',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 334574,
    uuid: '22581774-6150-4203-a174-dfaaaa813d27',
    strength: 5
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Library Assessment',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 334575,
    uuid: '1b053c3b-c5fd-4a42-a805-ad38445391a8',
    strength: 12
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Accreditation Reports Archive',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 334573,
    uuid: '6fb81f0e-c1bc-4deb-82c8-5d705be09035',
    strength: 1
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - BME 3233 Biomaterials Reviews',
    parent: 329107,
    children: [],
    logo: '',
    handleID: 330097,
    uuid: '92bfd683-de49-46de-96ff-d44acbbf0342',
    strength: 4
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'A*SYST publications',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 334975,
    uuid: 'b90df4f6-3256-4b2b-ada6-96b849f93f98',
    strength: 23
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Factbook and Demobook Archive',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 335238,
    uuid: 'ea676abb-853d-45e5-a0b6-8619bd08ae84',
    strength: 21
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'UCO - Library Art Exhibition Booklet Archive',
    parent: 47149,
    children: [],
    logo: '',
    handleID: 335107,
    uuid: '77228d9b-82e8-41f9-b3e1-7df80c58c929',
    strength: 14
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Cotton research reports',
    parent: 301782,
    children: [],
    logo: '',
    handleID: 334999,
    uuid: '40520781-8ad0-47d2-bb2f-8a85742f25db',
    strength: 17
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'Undergraduate Research Symposium',
    parent: 319582,
    children: [],
    logo: '',
    handleID: 335213,
    uuid: 'fa0995ee-c7df-493d-8cbc-929bf0dd9a94',
    strength: 31
  },
{
    resourcetype: ResourceType.COLLECTION,
    name: 'OU - BME 3161 Biomedical Micro-Nanotechnology Lab',
    parent: 329107,
    children: [],
    logo: '',
    handleID: 335876,
    uuid: '2cf02601-4c35-4935-80d8-a1c8a46e8409',
    strength: 1
  },
  {
    resourcetype: ResourceType.COLLECTION,
    name: 'Entity - Journal Issues',
    parent: 400003,
    children: [],
    logo: '',
    handleID: 400004,
    uuid: 'b7bf809e-b8ea-41bf-b16a-38d78785f557',
    strength: 20
  },
  {
    resourcetype: ResourceType.COLLECTION,
    name: 'Entity - Journals',
    parent: 400003,
    children: [],
    logo: '',
    handleID: 400005,
    uuid: '8ad84c46-bdf1-4558-9b90-5c43ff396980',
    strength: 2
  },
  {
    resourcetype: ResourceType.COLLECTION,
    name: 'Entity - Journal Volumes',
    parent: 400003,
    children: [],
    logo: '',
    handleID: 400006,
    uuid: '8814a173-73ce-4ca3-92c2-17c9d0f2268c',
    strength: 4
  },
  {
    resourcetype: ResourceType.COLLECTION,
    name: 'Entity - OrgUnits',
    parent: 400002,
    children: [],
    logo: '',
    handleID: 400007,
    uuid: 'd8ab207f-6eda-4c42-b2e5-ef76c2586070',
    strength: 30
  },
  {
    resourcetype: ResourceType.COLLECTION,
    name: 'Entity - Publications',
    parent: 400001,
    children: [],
    logo: '',
    handleID: 400008,
    uuid: 'dd1240ae-d7dd-405c-bdc3-d6c960609433',
    strength: 44
  },
  {
    resourcetype: ResourceType.COLLECTION,
    name: 'Entity - Projects',
    parent: 400002,
    children: [],
    logo: '',
    handleID: 400009,
    uuid: 'eb3224f3-6383-42e1-abe0-a73df842608a',
    strength: 20
  },
  {
    resourcetype: ResourceType.COLLECTION,
    name: 'Entity - People',
    parent: 400002,
    children: [],
    logo: '',
    handleID: 400010,
    uuid: 'ece42bb4-5ec0-4760-b727-30f9f593acb8',
    strength: 61
  }
]

export const ITEMDATASETSAMPLE: ResourceData[] = [
  {
    resourcetype: ResourceType.ITEM,
    name: "Application of Tiab\'s Direct Synthesis technique to transient pressure response of non-Newtonian fluids in vertical wells",
    uuid: "f0c0e637-42f1-4812-933b-6e2c6dc02400",
    handleID: 337018,
    parent: 23528,
    children: [],
    files: ['c7282556-e959-4873-814e-0bcc322fca80'],
    metadata: [
      ["dc.contributor.advisor", "Tiab, Djebbar"],
      ["dc.contributor.author", "Meindl, Irina Desiree Katime::ec08dcfb-eca0-4a06-a8cb-751f4005b8b2::0"],
      ["dc.contributor.committeeMember", "Osisanya, Samuel||Shah, Subhash"],
      ["dc.date.accessioned", "2023-01-30T22:15:03Z"],
      ["dc.date.issued", 2000],
      ["dc.date.manuscript", 2000],
      ["dc.description.abstract[en_US]", "Non-Newtonian fluids are very common during drilling, fracture operations and enhanced oil recovery processes. When a reservoir contains a non-Newtonian fluid such as those injected during polymer flood or the production of heavy oil, well test data cannot be interpreted using Newtonian fluid flow models. The resulting analysis would be erroneous because non-Newtonian fluids behave rather differently.\nThese results suggest the need for a thorough study of the behavior of non-Newtonian fluids in the reservoir and also a new look at the flow of those fluids in porous media.\nThis study presents an interpretation technique for pressure behavior of non-Newtonian fluid flow in a homogeneous reservoir without type-curve Matching. The inclusion of a no-flow and/or a constant pressure line is also investigated.\nFirst, the TSD (Tiab\'s Direct Synthesis) technique was applied for analyzing the pressure behavior of a well located in (1) an infinite reservoir and, (2) near a linear boundary where wellbore storage and skin effects were considered. The analysis required the generation of type-curve sets for different wellbore storage and skin values.\nA step-by-step procedure is presented for the calculation of the reservoir parameters: the permeability/viscosity ratio, wellbore storage coefficient, skin factor and the distance to the nearest boundary without the use of type-curve Matching. The procedure is illustrated by a numerical example."],
      ["dc.identifier.uri", "https://shareok.org/handle/11244/337018"],
      ["dc.language[en_US]", "en_US"],
      ["dc.subject.lcsh", "Non-Newtonian fluids||Oil field flooding||Hydrocarbon reservoirs||Oil wells"],
      ["dc.thesis.degree[en_US]", "Master of Science"],
      ["dc.title[en_US]", "Application of Tiab\'s Direct Synthesis technique to transient pressure response of non-Newtonian fluids in vertical wells"]
    ]
  }
]