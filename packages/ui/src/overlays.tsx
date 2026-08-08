import {ChevronDown, X} from "lucide-react";
import {type MouseEvent as ReactMouseEvent, type ReactNode, useEffect, useId, useRef, useState} from "react";
import {Button, IconButton} from "./buttons";
import {Heading, Text} from "./foundations";
import {Stack} from "./layout";
import styles from "./styles.module.css";
import {cx} from "./utils";

export interface DialogProps {
    children: ReactNode;
    closeLabel: string;
    description?: ReactNode;
    footer?: ReactNode;
    onOpenChange: (open: boolean) => void;
    open: boolean;
    title: ReactNode;
}

export function Dialog({children, closeLabel, description, footer, onOpenChange, open, title}: DialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const descriptionId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    const closeOnBackdrop = (event: ReactMouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) onOpenChange(false);
    };

    return (
        <dialog
            aria-describedby={description ? descriptionId : undefined}
            aria-labelledby={titleId}
            className={styles.dialogBackdrop}
            onCancel={(event) => {
                event.preventDefault();
                onOpenChange(false);
            }}
            onClick={closeOnBackdrop}
            onKeyDown={(event) => {
                if (event.key === "Escape") onOpenChange(false);
            }}
            ref={dialogRef}
        >
            <div className={styles.dialogPanel}>
                <div className={styles.dialogHeader}>
                    <div>
                        <Heading as="h2" id={titleId} size="sm">
                            {title}
                        </Heading>
                        {description ? (
                            <Text id={descriptionId} muted size="small">
                                {description}
                            </Text>
                        ) : null}
                    </div>
                    <IconButton
                        icon={<X aria-hidden="true"/>}
                        label={closeLabel}
                        onClick={() => onOpenChange(false)}
                        size="sm"
                        variant="ghost"
                    />
                </div>
                <div className={styles.dialogContent}>{children}</div>
                {footer ? <div className={styles.dialogFooter}>{footer}</div> : null}
            </div>
        </dialog>
    );
}

export type AlertDialogProps = DialogProps;

export function AlertDialog(props: AlertDialogProps) {
    return <Dialog {...props} />;
}

export interface PopoverProps {
    children: ReactNode;
    label: ReactNode;
}

export function Popover({children, label}: PopoverProps) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const contentId = useId();

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    return (
        <div className={styles.popoverRoot} ref={rootRef}>
            <Button aria-controls={contentId} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
                {label}
                <ChevronDown aria-hidden="true"/>
            </Button>
            {open ? (
                <div className={styles.popoverPanel} id={contentId}>
                    {children}
                </div>
            ) : null}
        </div>
    );
}

export interface DropdownMenuItem {
    danger?: boolean;
    disabled?: boolean;
    id: string;
    label: ReactNode;
    onSelect: () => void;
}

export interface DropdownMenuProps {
    items: DropdownMenuItem[];
    label: ReactNode;
}

export function DropdownMenu({items, label}: DropdownMenuProps) {
    return (
        <Popover label={label}>
            <div className={styles.menu} role="menu">
                {items.map((item) => (
                    <button
                        className={cx(styles.menuItem, item.danger && styles.menuItemDanger)}
                        disabled={item.disabled}
                        key={item.id}
                        onClick={item.onSelect}
                        role="menuitem"
                        type="button"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </Popover>
    );
}

export interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
}

export function Tooltip({children, content}: TooltipProps) {
    const id = useId();
    return (
        <span aria-describedby={id} className={styles.tooltipRoot}>
      {children}
            <span className={styles.tooltip} id={id} role="tooltip">
        {content}
      </span>
    </span>
    );
}

export interface ToastProps {
    action?: ReactNode;
    description?: ReactNode;
    onDismiss?: () => void;
    title: ReactNode;
}

export function Toast({action, description, onDismiss, title}: ToastProps) {
    return (
        <div className={styles.toast} role="status">
            <Stack gap="1">
                <Text weight="semibold">{title}</Text>
                {description ? (
                    <Text muted size="small">
                        {description}
                    </Text>
                ) : null}
            </Stack>
            {action}
            {onDismiss ? (
                <IconButton
                    icon={<X aria-hidden="true"/>}
                    label={String(title)}
                    onClick={onDismiss}
                    size="sm"
                    variant="ghost"
                />
            ) : null}
        </div>
    );
}

export interface ToastRegionProps {
    "aria-label": string;
    children: ReactNode;
}

export function ToastRegion({"aria-label": ariaLabel, children}: ToastRegionProps) {
    return (
        <section aria-label={ariaLabel} className={styles.toastRegion}>
            {children}
        </section>
    );
}
