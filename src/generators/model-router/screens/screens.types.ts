import { Model } from "../../generators.model";

export interface BaseScreenProps {
  /**
   * UI-friendly string that represents the model
   */
  modelName: string;

  /**
   * Structure that represents the fields of the model
   */
  model: Model;

  /**
   * Path to attach before each internal ModelRouter path
   */
  basePath?: string;

  /**
   * If true delete features are enabled
   */
  deleteFeature?: boolean;

  /**
   * If true update features are enabled
   */
  updateFeature?: boolean;

  /**
   * If true add features are enabled
   */
  addFeature?: boolean;

  /**
   * If true details features are enabled
   */
  detailsFeature?: boolean;
}
