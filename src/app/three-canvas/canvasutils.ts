export interface UserObject {
    packing3: { pos: THREE.Vector3; valid: number; }[],
    packing2: { pos: THREE.Vector3; valid: number; }[],
    showstatus: boolean,
    resourcedata: ResourceData
}

export interface ResourceData {
    resourcetype: ResourceType,
    name: string,
    parent?: number,
    children: number[],
    handle?: string,
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
    handle: string,
    uuid: string,
    logo: string
}

export interface CollectionData {
    resourcetype: ResourceType,
    name: string,
    children: number[],
    handle: string,
    uuid: string,
    logo: string
}


export interface ItemData {
    resourcetype: ResourceType,
    name: string,
    owningcollection: number[],
    handle: string,
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