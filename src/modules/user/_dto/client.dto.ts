import { ApiProperty } from '@nestjs/swagger';

import { Location } from '../../../interfaces/location';
import { Order } from '../../../interfaces/order';
import { ListItem, Client } from '../../../interfaces/user';

export class ClientDto {
  @ApiProperty({ title: `User's name`, type: String })
  name: string;

  @ApiProperty({ title: `User's email`, type: String })
  email: string;

  @ApiProperty({ title: `User's phoneNumber`, type: String })
  phoneNumber: string;

  @ApiProperty({ title: `User's company name`, type: String })
  companyName: string;

  @ApiProperty({ title: `User's locations` })
  locations: Array<Location>;

  @ApiProperty({ title: `User's orders` })
  orders: {
    suppliers: Array<any>;
    categories: Array<any>;
    data: Order[];
  };

  @ApiProperty({ title: `User's last order if it was not finished` })
  unfinishedOrder: Order;

  @ApiProperty({ title: `User's items list` })
  lists: ListItem[];

  @ApiProperty({ title: `User's payment methods` })
  paymentMethods: Array<any>;

  @ApiProperty({ title: `Analytics according to user's activity` })
  analyticsData: Object;

  @ApiProperty({ title: `User's role` })
  role: string;

  constructor(user: Client) {
    this.name = user.name;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.companyName = user.companyName;
    this.locations = user.locations;
    this.orders = user.orders;
    this.unfinishedOrder = user.unfinishedOrder;
    this.lists = user.lists;
    this.paymentMethods = user.paymentMethods;
    this.analyticsData = user.analyticsData;
    this.role = user.role;
  }
}
