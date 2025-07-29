"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBatdge from "../StatusBatdge";
import { formatDateTime } from "@/lib/utils";
import { AdmissionsOfficers } from '@/constants';
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/types/appwrite.types";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({ row }) => (
      <p className="text-14-medium">{row.index + 1}</p>
    ),
  },
  {
    accessorKey: 'student',
    header: 'Student',
    cell: ({ row }) => (
      <p className="text-14-medium">{row?.original?.student?.name}</p>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBatdge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: 'Appointment',
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'primaryAdmissionsOfficer',
    header: () => 'Admissions Officer',
    cell: ({ row }) => {
      const admissionsOfficer = AdmissionsOfficers.find(
        (officer) => officer.name === row.original.primaryAdmissionsOfficer
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={admissionsOfficer?.image!}
            alt={admissionsOfficer?.name || 'Admissions Officer'}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Mr./Ms. {admissionsOfficer?.name}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            studentId={data?.student?.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            studentId={data?.student?.$id}
            userId={data.userId}
            appointment={data}
          />
        </div>
      );
    },
  },
];
