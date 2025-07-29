import Image from "next/image";
import StudentForm from '@/components/forms/StudentForm';
import Link from "next/link";
import PasskeyModal from "@/components/ui/PasskeyModal";

export default function Home({ searchParams }: SearchParamProps) {

  const isAdmin = searchParams?.admin === "true"

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px] ">
          <Image
            src="/assets/icons/logo-full.png"
            height={1000}
            width={1000}
            alt="student"
            className="mb-12 h-10 w-fit"
          />

          <h1 className="text-24-semibold mb-4 text-dark-900">
            Book an Appointment with an Admissions Officer
          </h1>
          <p className="text-14-regular text-dark-600 mb-8">
            Please fill out the form below to schedule your session.
            We’ll contact you via email or WhatsApp.
          </p>

          <StudentForm />

          <div className="text-14-regular mt-20 flex justify-between items-center">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © {new Date().getFullYear()} ShedulNA – Helping Students
              Connect with Admissions
            </p>
            <Link href={'/?admin=true'} className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        alt="student"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
