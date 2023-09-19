import { useInstitutionStore } from '~/stores/institution'
export default defineNuxtPlugin(async (nuxtApp) => {
    try {
        const header = useRequestHeaders();
        const cookie = header.cookie;
        const ck = cookie.split(";")?.find((c) => c.trim().startsWith("token="))?.trim();
        const token = ck?.slice(6, ck.length);
        if (token) {
            useInstitutionStore().setInstitutions()
        }
    } catch (error) {}
})
