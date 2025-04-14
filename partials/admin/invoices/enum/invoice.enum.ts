export enum InvoiceCategoriesEnum {
    PlacementStarted = 'placementStarted',
    Appointment = 'appointment',
    NewAddedStudents = 'newAddedStudent',
    PlacementCompleted = 'placementCompleted',
    WorkplaceRequest = 'workplaceRequest',
}

export enum InvoiceTypeEnum {
    Monthly = 'monthly',
    Weekly = 'weekly',
    Fortnightly = 'fortnightly',
}

export enum PaymentStatusEnum {
    Paid = 'paid',
    DuplicateCharged = 'duplicateCharged',
    Deleted = 'deleted',
    Refunded = 'refunded',
}
