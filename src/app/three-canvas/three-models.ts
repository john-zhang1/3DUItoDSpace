export interface UserObject {
    packing3: SpherePacking[],
    packing2: SpherePacking[],
    showchildren: boolean,
    resourcedata: ResourceData
}

export interface ResourceData {
    resourcetype: ResourceType,
    name: string,
    description?: string,
    parent?: number,
    children: number[],
    handleID?: number,
    uuid?: string,
    strength?: number,
    logo?: string,
    files?: {title: string, link: string}[],
    metadata?: {key: string, value: string}[]
}

export interface CommunityData {
    resourcetype: ResourceType,
    name: string,
    parent: number,
    children: number[],
    handleID: number,
    uuid: string,
    logo: string
}

export interface CollectionData {
    resourcetype: ResourceType,
    name: string,
    children: number[],
    handleID: number,
    uuid: string,
    logo: string
}


export interface ItemData {
    resourcetype: ResourceType,
    name: string,
    owningcollection: number[],
    handleID: number,
    uuid: string,
    files: {title: string, link: string}[],
    metadata: {key: string, value: string}[]
}

export const enum ResourceType {
    BITSTREAM = 0,
    BUNDLE = 1,
    ITEM = 2,
    COLLECTION = 3,
    COMMUNITY = 4,
    SITE = 5,
    GROUP = 6,
    EPERSON = 7
}

export interface SpherePacking {
    position: THREE.Vector3,
    occupied: boolean
}

export interface PackingHelper {
    distance: number,
    packing: SpherePacking
}