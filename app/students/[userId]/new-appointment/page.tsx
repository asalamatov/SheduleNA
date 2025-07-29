"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AppointmentForm from "../../../../components/forms/AppointmentForm";
import { getStudent } from '@/lib/actions/student.actions';

interface Student {
  $id: string;
}

export default function NewAppointment({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const studentData = await getStudent(userId);
      setStudent(studentData);
    };

    fetchStudent();
  }, [userId]);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="student"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            studentId={student?.$id!}
          />

          <p className="copyright mt-10 my-12">
            © {new Date().getFullYear()} ShedulNA – Helping Students
            Connect with Admissions
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment"
        height={1000}
        width={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
