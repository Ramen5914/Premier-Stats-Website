import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grow flex flex-row items-center justify-center">
      <h1 className="pr-[23px] mr-[20px] py-3 border-r-[2px] border-current text-4xl">
        404
      </h1>
      <h2 className="font-normal text-lg">It&apos;s not you, it&apos;s us.</h2>
    </div>
  );
}
