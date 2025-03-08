import { getAllExams } from "@/api/exam";
import ExamTable from "@/components/ExamsTable";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: "get-exams",
    queryFn: getAllExams,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading exams</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Exams</h1>
      <ExamTable exams={data} refetchExams={refetch} />
    </div>
  );
};

export default Home;
