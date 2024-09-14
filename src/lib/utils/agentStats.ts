type Agent = {
  id: number;
  name: string;
  ip: string;
  group: string;
  os: string;
  cluster: string;
  version: string;
  registrationDate: string;
  lastKeepAlive: string;
  status: string;
};

export function getAgentStatistics(agents: Agent[]) {
  const totalAgents = agents.length;
  
  const activeCount = agents.filter(agent => agent.status === 'active').length;
  const disconnectedCount = agents.filter(agent => agent.status === 'disconnected').length;
  const neverConnectedCount = agents.filter(agent => agent.status === 'never connected').length;

  const mostActiveAgent = agents.reduce((latest, agent) => {
    const lastKeepAliveDate = new Date(agent.lastKeepAlive);
    return lastKeepAliveDate > new Date(latest.lastKeepAlive) ? agent : latest;
  }, agents[0]);

  const mostRecentRegistrationAgent = agents.reduce((latest, agent) => {
    const registrationDate = new Date(agent.registrationDate);
    return registrationDate > new Date(latest.registrationDate) ? agent : latest;
  }, agents[0]);

  const coveragePercentage = ((activeCount / totalAgents) * 100).toFixed(2) + '%';

  return {
    activeCount,
    disconnectedCount,
    neverConnectedCount,
    mostActiveAgent: mostActiveAgent.name,
    mostRecentRegistrationAgent: mostRecentRegistrationAgent.name,
    coveragePercentage,
  };
}
