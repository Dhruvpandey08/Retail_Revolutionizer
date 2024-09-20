import React from 'react';
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Chart_1 } from "../ChartsComponent/Chart_1";


export function Dashboard({Data}) {
  
  const totalSalesData = Object.entries(Data).map(([productName, product]) => {
    const sales = product.NewValue
      ? product.NewValue.filter(value => value !== 'null').reduce((acc, value) => acc + Number(value), 0)
      : 0;
    return { name: productName, sales };
  });
  console.log(totalSalesData);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle className="font-Inter text-2xl">Prediction</CardTitle>
                <CardDescription className="font-Inter text-base">
                  Upcoming Most Selling Products.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <a href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="font-Inter">
                    <TableHead>Product</TableHead>
                    <TableHead >
                      UPW1
                    </TableHead>
                    <TableHead>
                      UPW2
                    </TableHead>
                    <TableHead>
                      UPW3
                    </TableHead>
                    <TableHead>
                      UPW4
                    </TableHead>
                    <TableHead>
                      UPW5
                    </TableHead>
                    <TableHead>
                      UPW6
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>

                {Object.entries(Data).map(([productName, product]) => (
                    <TableRow key={productName}>
                    <TableCell>
                        <div className="font-Inter">{productName}</div>
                    </TableCell>
                    {product.NewValue && product.NewValue.length > 0 ? (
                        product.NewValue
                        .filter(value => value !== 'null')  
                        .map((value, index) => <TableCell key={index} className='text-sm text-muted-foreground font-Inter'>{value}</TableCell>)
                    ) : (
                    <TableCell colSpan="6">No new values found for this product.</TableCell>
                    )}
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Chart_1 SalesData={totalSalesData}/>
        </div>
      </main>
    </div>
  )
}

export default Dashboard;