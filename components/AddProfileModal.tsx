'use client'
import React, { useCallback } from 'react'
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { Modal, Button, ActionIcon, Card, TextInput } from '@mantine/core';
import { lato, montserrat } from '@/lib/fonts';

function AddProfileModal() {
    const [opened, { open, close }] = useDisclosure(false);
    const { width, height } = useViewportSize()
    const [formPanel, setFormPanel] = React.useState<"Contact" | "Social">("Contact")
    const [formData, setFormData] = React.useState<{
        name: string,
        email: string,
        phone: string,
        instagram: string,
        youtube: string,
    }>({
        name: "",
        email: "",
        phone: "",
        instagram: "",
        youtube: "",
    })

    const [profileData, setProfileData] = React.useState<{
        name: string,
        email: string,
        phone: string,
        instagram: string,
        youtube: string,
    }>({
        name: "",
        email: "",
        phone: "",
        instagram: "",
        youtube: "",
    })

    const handleChangePanel = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (formPanel === "Contact") {
            setFormPanel("Social")
        }
        else if (formPanel === "Social") {
            setProfileData(formData)
            close()
        }
    }, [formPanel, close, setFormPanel, setProfileData, formData])


    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Add New Profile"
                className="rounded-lg"
                radius={16}
                classNames={{
                    title: "font-semibold text-xl",
                    close: "",
                    header: "border-b-[0.5px] border-[#999CA0]",
                }}
                closeButtonProps={{
                    color: "#999CA0"
                }}
                size={width > 768 ? "45%" : "95%"}
                centered
            >
                <Card className="w-full">
                    <div className="flex flex-grow justify-between">
                        <div className="w-1/2">
                            <p className="text-lg font-semibold pb-3 flex flex-col items-center">Basic</p>
                            {formPanel === "Contact" ?
                                <div className="w-[90%] h-[0.8dvh] bg-[#3F84F8] rounded-[30px]"></div> :
                                <div className="w-[90%] h-[0.8dvh] bg-[#D9D9D9] rounded-[30px]"></div>
                            }
                        </div>
                        <div className="w-1/2 flex flex-col items-center">
                            <p className="text-lg font-semibold pb-3">{String(formPanel)}</p>
                            {formPanel === "Contact" ?
                                <div className="w-[90%] h-[0.8dvh] bg-[#D9D9D9] rounded-[30px]"></div> :
                                <div className="w-[90%] h-[0.8dvh] bg-[#3F84F8] rounded-[30px]"></div>
                            }
                        </div>
                    </div>
                    {formPanel === "Contact" ?
                        <form className="pt-4 space-y-4" onSubmit={handleChangePanel}>
                            <TextInput
                                label="Enter Name"
                                placeholder="Eg. John Doe"
                                className="w-full"
                                required
                                withAsterisk
                                classNames={{
                                    input: `${montserrat.className} border-[1px] border-[#F2F2F2] rounded-lg`,
                                }}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
                            />
                            <TextInput
                                label="Enter Email"
                                placeholder="Eg. John@xyz.com"
                                className="w-full"
                                required
                                type="email"
                                withAsterisk
                                classNames={{
                                    input: `${montserrat.className} border-[1px] border-[#F2F2F2] rounded-lg`,
                                }}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.currentTarget.value })}
                            />
                            <TextInput
                                label="Enter Phone"
                                placeholder="Eg. 9721724635"
                                className="w-full"
                                required
                                withAsterisk
                                type="tel"
                                pattern="[0-9]{10}"
                                classNames={{
                                    input: `${montserrat.className} border-[1px] border-[#F2F2F2] rounded-lg`,
                                }}
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.currentTarget.value })}
                            />
                            <Card.Section>
                                <hr className="h-px my-8 bg-gray-200 border-0"></hr>
                            </Card.Section>
                            <div className="flex flex-grow justify-end">
                                <Button
                                    variant="filled"
                                    color="blue"
                                    className="rounded-lg px-4 py-2 tracking-wider font-semibold"
                                    type="submit"
                                >
                                    Next
                                </Button>
                            </div>
                        </form>
                        :
                        <form className="pt-4 space-y-4" onSubmit={handleChangePanel}>
                            <TextInput
                                label="Instagram Link (Optional)"
                                placeholder="Eg. instagram.com/username"
                                className="w-full"
                                classNames={{
                                    input: `${montserrat.className} border-[1px] border-[#F2F2F2] rounded-lg`,
                                }}
                                value={formData.instagram}
                                onChange={(e) => setFormData({ ...formData, instagram: e.currentTarget.value })}
                            />
                            <TextInput
                                label="Youtube Link (Optional)"
                                placeholder="Eg. youtube.com/username"
                                className="w-full"
                                classNames={{
                                    input: `${montserrat.className} border-[1px] border-[#F2F2F2] rounded-lg`,
                                }}
                                value={formData.youtube}
                                onChange={(e) => setFormData({ ...formData, youtube: e.currentTarget.value })}
                            />
                            <Card.Section>
                                <hr className="h-px my-8 bg-gray-200 border-0"></hr>
                            </Card.Section>
                            <div className="flex flex-grow justify-end">
                                {/* //back Button */}
                                <Button
                                    variant="outline"
                                    color="black"
                                    className="rounded-lg px-4 py-2 tracking-wider font-semibold mr-4 border-[#999CA0]"
                                    onClick={() => setFormPanel("Contact")}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="filled"
                                    color="blue"
                                    className="rounded-lg px-4 py-2 tracking-wider font-semibold"
                                    type="submit"
                                >
                                    Done
                                </Button>
                            </div>
                        </form>
                    }
                </Card>
            </Modal>
            {profileData.name === "" && profileData.email === "" && profileData.phone === "" ?
                <div className="flex flex-grow items-center justify-center w-full">
                    <div className="flex flex-col items-center justify-center">
                        <ActionIcon color="#F2F2F2" variant="filled" className="rounded-full" size="xl" onClick={open}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#999CA0" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg>
                        </ActionIcon>
                        <p className="font-semibold text-lg text-[#858585]">Add Profile</p>
                    </div>
                </div>
                :
                <>
                    <p className="font-semibold text-2xl pt-4">John Doe</p>
                    <div className="pt-4 flex flex-grow items-center justify-center h-full w-full">
                        <div className="grid md:grid-cols-6 xl:grid-cols-12 md:gap-4">
                            <div className="flex space-x-4 items-center col-span-6">
                                <ActionIcon color="#3CC952" variant="light" className="rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                    </svg>
                                </ActionIcon>
                                <p className="underline">+91 {profileData.phone}</p>
                            </div>
                            {profileData.instagram &&
                                <div className="flex space-x-4 items-center col-span-6">
                                    <ActionIcon color="#FF4E64" variant="light" className="rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                        </svg>
                                    </ActionIcon>
                                    <a href={profileData.instagram} className="underline">{profileData.instagram}</a>
                                </div>
                            }
                            {profileData.email &&
                                <div className="flex space-x-4 items-center col-span-6">
                                    <ActionIcon color="#5C33CF" variant="light" className="rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                        </svg>
                                    </ActionIcon>
                                    <p className="underline">{profileData.email}</p>
                                </div>
                            }
                            {profileData.youtube &&
                                <div className="flex space-x-4 items-center col-span-6">
                                    <ActionIcon color="#FF4E64" variant="light" className="rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                                            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                                        </svg>
                                    </ActionIcon>
                                    <a href={profileData.youtube} className="underline">{profileData.youtube}</a>
                                </div>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default AddProfileModal