import AnimatedHeader from "@/app/components/landing/AnimatedHeader";

export default function Home() {
  return (
    <div>
      <AnimatedHeader />
      <div className=" w-full h-[100vh] bg-[#999D9E]"></div>
      <div className=" w-full h-[100vh] bg-gray-800"></div>
    </div>
  );
}
