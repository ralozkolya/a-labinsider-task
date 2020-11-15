import TableWrapper from "./TableWrapper";

export default function AllFacilitiesTable(props) {
  return (
    <TableWrapper data={props.data} onRefresh={props.onRefresh} />
  );
}
