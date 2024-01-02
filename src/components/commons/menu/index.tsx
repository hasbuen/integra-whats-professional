import React, { useState, useRef, useEffect } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { Config } from '@/components/UI';
import ConexaoModal from '@/components/modals/ConexaoModal';
import { MenuBook } from '@mui/icons-material';

/**
 * Componente que representa o menu de configurações.
 * @component
 */
function ConfigMenu() {
    // Estado para controlar a abertura do modal de conexões
    const [abrirModal, setAbrirModal] = useState(false);
    // Estado para armazenar a referência do elemento âncora do menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // Ref para o elemento do menu
    const menuRef = useRef<HTMLDivElement>(null);

    // Função para abrir o modal de conexões
    const abrirConexaoModal = () => {
        setAnchorEl(null);
        setAbrirModal(true);
    };

    // Função para abrir a documentação em uma nova janela
    const abrirDocs = () => {
        const url = `src/docs/index.html`;
        window.open(url, '_blank');
        setAnchorEl(null);
    };

    // Função para abrir o menu de itens
    const abrirMenuItens = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Função para fechar o modal
    const fecharModal = () => {
        setAnchorEl(null);
        setAbrirModal(false);
    };

    // Função para fechar o menu ao clicar fora dele
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setAnchorEl(null);
        }
    };

    // Efeito para adicionar e remover o ouvinte de clique fora do menu
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="container">
            {/* Componente Config que serve como botão de abertura do menu */}
            <Box className="box" gridColumn="span 12" textAlign="right" ref={menuRef}>
                <Config
                    aria-controls={anchorEl ? 'customized-menu' : undefined}
                    aria-haspopup="true"
                    onClick={abrirMenuItens}
                />
            </Box>
            {/* Menu de configurações */}
            <Menu
                id="customized-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
            >
                {/* Item do menu para abrir o modal de conexões */}
                <MenuItem onClick={abrirConexaoModal}>
                    Conexões
                </MenuItem>
                {/* Item do menu para abrir a documentação */}
                <MenuItem onClick={abrirDocs}>
                    Docs <MenuBook />
                </MenuItem>
            </Menu>
            {/* Modal de conexões */}
            <ConexaoModal abrirModal={abrirModal} fecharModal={fecharModal} />
        </div>
    );
}

export default ConfigMenu;