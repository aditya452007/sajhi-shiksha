import { useRef, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: (value: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    size?: 'small' | 'medium';
    fullWidth?: boolean;
}

export default function SearchInput({
    value,
    onChange,
    onSearch,
    placeholder = 'Search for study materials, question papers...',
    autoFocus = false,
    size = 'medium',
    fullWidth = true,
}: SearchInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch(value);
        }
    };

    return (
        <TextField
            inputRef={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            size={size}
            fullWidth={fullWidth}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                    endAdornment: value && (
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    onChange('');
                                    onSearch('');
                                }}
                            >
                                <ClearIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                },
            }}
        />
    );
}
