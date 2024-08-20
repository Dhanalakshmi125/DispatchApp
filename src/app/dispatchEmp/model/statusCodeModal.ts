export class StatusCodeModal {
    statusCode: number;
    message: string;
    constructor(data:any){
      this.statusCode=data.statusCode,
      this.message=data.message
    }
  }
  