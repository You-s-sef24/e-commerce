import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbBasic({ links, currentPage }) {
  return (
    <Breadcrumb className={"mb-5 ms-3"}>
      <BreadcrumbList>
        {links.map((link) => {
          return (
            <>
              <BreadcrumbItem key={link.name}>
                <BreadcrumbLink className={"text-lg"} href={link.url}>{link.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          );
        })}
        <BreadcrumbPage>{currentPage}</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
