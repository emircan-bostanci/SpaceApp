import { defineConfig } from "vite";
import dsv from '@rollup/plugin-dsv'

export default defineConfig({
    base:'/appstroid/',
    plugins:
    [
        dsv()
    ]
})