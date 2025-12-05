import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Bot, Network, Server, Globe, Lock, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [command, setCommand] = useState<string>('');

  const executeCommand = (cmd: string) => {
    let newOutput = [...output];
    newOutput.push(`> ${cmd}`);
    const lowerCmd = cmd.toLowerCase().trim();

    if (lowerCmd === 'help') {
      newOutput.push('Available commands: status, scan <ip>, deploy <target>, botnet list, botnet info <id>, attack <target> <type>, clear, exit');
    } else if (lowerCmd === 'status') {
      newOutput.push('System Status: ONLINE');
      newOutput.push('Botnets Active: 3');
      newOutput.push('Connections: 1245');
    } else if (lowerCmd.startsWith('scan ')) {
      const target = lowerCmd.split(' ')[1];
      if (target) {
        newOutput.push(`Scanning ${target}...`);
        newOutput.push(`[+] Open Ports: 80, 443, 22`);
        newOutput.push(`[+] OS: Linux Kernel 5.15`);
        newOutput.push(`[+] Vulnerabilities: CVE-2023-1234 (High)`);
      } else {
        newOutput.push('Usage: scan <ip>');
      }
    } else if (lowerCmd.startsWith('deploy ')) {
      const target = lowerCmd.split(' ')[1];
      if (target) {
        newOutput.push(`Deploying botnet agent to ${target}...`);
        newOutput.push(`[+] Agent deployed successfully. Bot ID: BOT-${Math.floor(Math.random() * 9000) + 1000}`);
      } else {
        newOutput.push('Usage: deploy <target>');
      }
    } else if (lowerCmd === 'botnet list') {
      newOutput.push('Botnets:');
      newOutput.push('  ID: BOT-1001, Status: Active, Bots: 500, Target: None');
      newOutput.push('  ID: BOT-1002, Status: Active, Bots: 750, Target: 192.168.1.1');
      newOutput.push('  ID: BOT-1003, Status: Idle, Bots: 200');
    } else if (lowerCmd.startsWith('botnet info ')) {
      const id = lowerCmd.split(' ')[2];
      if (id === 'bot-1001') {
        newOutput.push('Botnet ID: BOT-1001');
        newOutput.push('  Status: Active');
        newOutput.push('  Total Bots: 500');
        newOutput.push('  Locations: US, EU, ASIA');
        newOutput.push('  Traffic: 1.2Gbps');
      } else {
        newOutput.push('Botnet not found.');
      }
    } else if (lowerCmd.startsWith('attack ')) {
      const parts = lowerCmd.split(' ');
      const target = parts[1];
      const type = parts[2];
      if (target && type) {
        newOutput.push(`Initiating ${type} attack on ${target}...`);
        newOutput.push(`[+] Attack initiated. ETA: 30s`);
      } else {
        newOutput.push('Usage: attack <target> <type>');
      }
    } else if (lowerCmd === 'clear') {
      newOutput = [];
    } else if (lowerCmd === 'exit') {
      newOutput.push('Exiting terminal...');
      // In a real app, you might navigate away or close the terminal here.
    } else if (lowerCmd !== '') {
      newOutput.push(`Command not found: ${cmd}`);
    }

    setOutput(newOutput);
    setCommand('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(command);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-zinc-900 shadow-lg rounded-lg overflow-hidden border border-green-500"
      >
        <div className="bg-zinc-800 p-3 flex items-center justify-between border-b border-green-700">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="text-green-500" size={20} />
            <h1 className="text-lg font-bold text-green-300">CyberAttack Console</h1>
          </div>
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
        </div>
        <div className="p-4 h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-zinc-800">
          {output.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="whitespace-pre-wrap"
            >
              {line}
            </motion.p>
          ))}
          <div className="flex items-center mt-2">
            <span className="text-green-500">$</span>
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-green-400 ml-2"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </div>
        </div>
        <div className="bg-zinc-800 p-3 border-t border-green-700 flex items-center justify-around text-green-400">
            <div className="flex items-center space-x-1">
                <Bot size={16} />
                <span>Botnets: 3 Active</span>
            </div>
            <div className="flex items-center space-x-1">
                <Network size={16} />
                <span>Targets: 1 Online</span>
            </div>
            <div className="flex items-center space-x-1">
                <Server size={16} />
                <span>Servers: 5 Connected</span>
            </div>
            <div className="flex items-center space-x-1">
                <Globe size={16} />
                <span>Geo-IP: Enabled</span>
            </div>
            <div className="flex items-center space-x-1">
                <Shield size={16} />
                <span>Proxy: Active</span>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
