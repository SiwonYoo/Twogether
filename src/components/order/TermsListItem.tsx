import CheckBox from '@/components/common/CheckBox';
import { LucideChevronRight } from 'lucide-react';
import { TermInfo } from '@/components/order/TermsSection';

interface TermsListItemProps {
  termInfo: TermInfo;
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
  onDialogButtonClick?: () => void;
}

export default function TermsListItem({ termInfo, checked = false, onCheck, onDialogButtonClick }: TermsListItemProps) {
  const hideDialogButton = termInfo.content === '' ? true : false;

  return (
    <div className="flex flex-row justify-between">
      <CheckBox
        id={termInfo.title}
        name={termInfo.title}
        label={termInfo.title}
        checked={checked}
        onChange={(e) => onCheck?.(e.target.checked)}
        highlight={termInfo.highlight}
        required={termInfo.required}
        fontSize="md"
      />
      {!hideDialogButton && (
        <button type="button" className="hover:cursor-pointer" onClick={onDialogButtonClick}>
          <LucideChevronRight />
        </button>
      )}
    </div>
  );
}
