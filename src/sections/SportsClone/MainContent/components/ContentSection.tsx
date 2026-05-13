export type ContentSectionProps = {
  children?: React.ReactNode;
};

export const ContentSection = (props: ContentSectionProps) => {
  return (
    <div className="box-border caret-transparent gap-x-2 flex outline-[3px] overscroll-x-contain gap-y-2 overflow-auto mt-3">
      {props.children}
    </div>
  );
};
