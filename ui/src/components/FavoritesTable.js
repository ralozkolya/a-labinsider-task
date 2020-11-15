import TableWrapper from "./TableWrapper";

export default function FavoritesTable(props) {
  return (
    <TableWrapper data={props.data} onRefresh={props.onRefresh} onlyFavorites />
  );
}
