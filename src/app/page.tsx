import YouTubeUrlForm from "@/components/YouTubeURLForm";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div>
        <h1 className="font-extrabold text-5xl text-black"><span className="text-white bg-red-500 px-3 py-4 rounded-lg mr-2">Youtube </span> Analytics</h1>
      </div>
     
  /    <YouTubeUrlForm/>
    </div>
  );
}
