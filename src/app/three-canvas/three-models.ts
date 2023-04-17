import { Mesh } from "three";

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
    parent: number,
    children: number[],
    handleID?: number,
    uuid?: string,
    strength?: number,
    logo?: string,
    files?: string[],
    metadata?: MetadataPair[],
}

export interface ItemResourceData {
    resourcetype: ResourceType,
    name?: string[],
    author?: string[],
    abstract?: string[],
    parentUUID: string[],
    handleID?: number,
    uuid: string,
    dateIssued?: string[],
    files?: string[],
    metadata?: MetadataPair[],
    entityType?: string[],
    isOrgUnitOfPublication?: string[],
    isPublicationOfOrgUnit?: string[],
    isProjectOfPerson?: string[],
    isPersonOfProject?: string[],
    isOrgUnitOfProject?: string[],
    isProjectOfOrgUnit?: string[],
    isParentOrgUnitOf?: string[],
    isChildOrgUnitOf?: string[],
    isOrgUnitOfPerson?: string[],
    isPersonOfOrgUnit?: string[],
    isAuthorOfPublication?: string[],
    isPublicationOfAuthor?: string[],
    isProjectOfPublication?: string[],
    isPublicationOfProject?: string[],
    isVolumeOfJournal?: string[],
    isJournalOfVolume?: string[],
    isIssueOfJournalVolume?: string[],
    isJournalVolumeOfIssue?: string[],
    isPublicationOfJournalIssue?: string[],
    isJournalIssueOfPublication?: string[]
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
    parent: number
    children: number[],
    handleID: number,
    uuid: string,
    logo: string
}

export interface ItemData {
    resourcetype: ResourceType,
    title: string[],
    author?: string[],
    owningcollection: number[],
    abstract?: string[],
    handle: string,
    issued: string[],
    uuid: string,
    files?: string[],
    metadata?: {key: string, value: string}[]
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

export interface MoonPair {
    id: number,
    name: string
}

export type MetadataPair = [string, string | number]

export interface Item {
    content: string,
    id: string,
    type: string,
    items: Item[],
    focused: Item
}

export interface NestedResourceNode {
    id: number,
    name: string,
    strength: number,
    children?: NestedResourceNode[]
}

export interface FlatResourceNode {
    id: number,
    expandable: boolean
    name: string,
    level: number,
    isExpanded?: boolean,
    strength: number
  }

  export interface SimpleNode {
    id: number,
    name: string,
    level: number
  }

export interface ExampleFlatNode {
    expandable: boolean,
    name: string,
    level: number,
    isExpanded?: boolean
  }
