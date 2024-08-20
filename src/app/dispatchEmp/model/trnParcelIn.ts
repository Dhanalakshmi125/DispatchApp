
export class TrnParcelIn {
    recipientLocCode: string;
    inTrackingId: number;
    consignmentNumber: string;
    consignmentDate: Date;
    receivedDate: Date;
    senderLocCode: string='';
    senderDepartment: string;
    senderName: string;
    recipientDepartment: string;
    recipientName: string;
    courierName: string;
    recordStatus: string;
    createdBy: string;
    createdDate: Date;
    LastUpdatedDate!:Date;
    constructor(data:any){
      this.recipientLocCode=data.recipientLocCode;
      this.inTrackingId=data.inTrackingId;
      this.consignmentNumber=data.consignmentNumber;
      this.consignmentDate=data.consignmentDate;
      this.receivedDate=data.receivedDate;
      this.senderLocCode=data.senderLocCode;
      this.senderDepartment=data.senderDepartment;
      this.senderName=data.senderName;
      this.recipientDepartment=data.recipientDepartment;
      this.recipientName=data.recipientName;
      this.courierName=data.courierName;
      this.recordStatus=data.recordStatus;
      this.createdBy=data.createdBy;
      this.createdDate=data.createdDate;
      this.LastUpdatedDate=data.lastUpdatedDate;
    }
  }
  