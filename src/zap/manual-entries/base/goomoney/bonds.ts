import { ProtocolEntry, LPType, Project } from '../../../types';

export const gooMoneyBonds: ProtocolEntry[] = [
    {
        name: "GooMoney GOO Bond",
        address: "0x1A859941D9c2380d0d5578DEF60F8C4BB96D751F",
        type: LPType.SINGLE,
        inputToken: {
            name: "cbBTC",
            address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
        },
    },
];