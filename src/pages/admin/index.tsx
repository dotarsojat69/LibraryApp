import { useSearchParams } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout";
import AdminBooks from "./module/books";
import AdminBorrows from "./module/borrows";

const Admin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");

  function handleTabChange(value: string) {
    searchParams.set("tab", value);
    for (const entry of searchParams.entries()) {
      if (entry[0] !== "tab") searchParams.delete(entry[0]);
    }
    setSearchParams(searchParams);
  }

  return (
    <Layout centerX>
      <Tabs
        className="w-full flex flex-col items-center"
        defaultValue={tabParam ?? "books"}
        onValueChange={(e) => handleTabChange(e)}
      >
        <TabsList className="w-fit">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="borrows">Borrows</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="books">
          <AdminBooks />
        </TabsContent>
        <TabsContent className="w-full" value="borrows">
          <AdminBorrows />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Admin;