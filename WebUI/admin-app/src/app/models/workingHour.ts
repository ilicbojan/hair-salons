export interface IWorkingHour {
  id: number;
  day: number;
  openTime: string;
  closeTime: string;
  hairSalonId: number;
}

export interface IWorkingHoursFormValues {
  hairSalonId: number;
  workingHours: IWorkingHour[];
}
