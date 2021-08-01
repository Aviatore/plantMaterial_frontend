import {IPrep} from "./IPrep";

export interface IPlantSample {
  plantSampleId: string;
  sampleName: string;
  collectionDate: Date;
  populationId: string;
  plantSampleDescription: string;
  tissueId: string;
  duplicationId: string;
  phenotypeId: string;
  sampleWeight: string;
  locationId: string;
  shelfPositionId: string;
  containerTypeId: string;
  prepsLocation: IPrep[]
}
