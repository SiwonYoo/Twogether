interface InfoListItemProps {
  children?: React.ReactNode;
}

function InfoListItem({ children }: InfoListItemProps) {
  return <li className={`list-disc ml-4`}>{children}</li>;
}

export default InfoListItem;
