/**
 * Arrival Notebook design: even a missing route gets a clear, friendly way back to the student's arrival journey.
 */
import { Link } from "wouter";
import { ArrowLeft, MapPinOff } from "lucide-react";

export default function NotFound() { return <main className="not-found"><MapPinOff size={38} /><p className="kicker">Route not found</p><h1>This page took a wrong turn.</h1><p>Let’s get you back to the part that helps.</p><Link href="/" className="button-dark"><ArrowLeft size={17} /> Back to ConvergeIST</Link></main>; }
