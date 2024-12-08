import { FirewallRuleForm } from "@/components/AddRuleForm";

export default function Home() {
	return (
		<main className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-8'>Firewall Rule Configuration</h1>
			<FirewallRuleForm />
		</main>
	);
}
