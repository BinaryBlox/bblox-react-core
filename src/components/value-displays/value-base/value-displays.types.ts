export interface BaseValueProps<T> {
  /**
   * Name of the displayed value
   */
  label: string;

  /**
   * Value displayed
   */
  value?: T;

  /**
   * String rendered if value is undefined
   */
  placeholder?: string;

  /**
   * The value has to be displayed as compact or not.
   * False by default
   */
  dense?: boolean;
}

export interface EditableValueProps<T> {
  /**
   * This field can be edited or not
   */
  editable?: boolean;

  /**
   * Callback executed when the value is edited
   */
  onEdit?: (value?: T) => void;
}

export const DefaultPlaceholder = "-";
