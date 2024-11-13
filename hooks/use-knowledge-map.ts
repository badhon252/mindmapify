'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Node, Connection, KnowledgeMap } from '@/types/knowledge-map';

interface KnowledgeMapStore {
  maps: KnowledgeMap[];
  currentMap: KnowledgeMap | null;
  createMap: () => string;
  loadMap: (mapId: string) => void;
  updateMap: (mapId: string, updates: Partial<KnowledgeMap>) => void;
  deleteMap: (mapId: string) => void;
  addNode: (mapId: string, node: Node) => void;
  updateNode: (mapId: string, nodeId: string, updates: Partial<Node>) => void;
  removeNode: (mapId: string, nodeId: string) => void;
  addConnection: (mapId: string, connection: Connection) => void;
  removeConnection: (mapId: string, connectionId: string) => void;
  updateNodePosition: (mapId: string, nodeId: string, position: { x: number; y: number }) => void;
}

export const useKnowledgeMap = create<KnowledgeMapStore>()(
  persist(
    (set, get) => ({
      maps: [],
      currentMap: null,

      createMap: () => {
        const newMap: KnowledgeMap = {
          id: `map-${Date.now()}`,
          title: 'Untitled Map',
          nodes: [],
          connections: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          ownerId: 'user-1', // Replace with actual user ID
        };

        set((state) => ({
          maps: [...state.maps, newMap],
          currentMap: newMap,
        }));

        return newMap.id;
      },

      loadMap: (mapId) => {
        const map = get().maps.find((m) => m.id === mapId);
        if (map) {
          set({ currentMap: map });
        }
      },

      updateMap: (mapId, updates) => {
        set((state) => ({
          maps: state.maps.map((map) =>
            map.id === mapId
              ? { ...map, ...updates, updatedAt: new Date() }
              : map
          ),
          currentMap:
            state.currentMap?.id === mapId
              ? { ...state.currentMap, ...updates, updatedAt: new Date() }
              : state.currentMap,
        }));
      },

      deleteMap: (mapId) => {
        set((state) => ({
          maps: state.maps.filter((map) => map.id !== mapId),
          currentMap: state.currentMap?.id === mapId ? null : state.currentMap,
        }));
      },

      addNode: (mapId, node) => {
        set((state) => ({
          maps: state.maps.map((map) =>
            map.id === mapId
              ? {
                  ...map,
                  nodes: [...map.nodes, node],
                  updatedAt: new Date(),
                }
              : map
          ),
          currentMap:
            state.currentMap?.id === mapId
              ? {
                  ...state.currentMap,
                  nodes: [...state.currentMap.nodes, node],
                  updatedAt: new Date(),
                }
              : state.currentMap,
        }));
      },

      updateNode: (mapId, nodeId, updates) => {
        set((state) => ({
          maps: state.maps.map((map) =>
            map.id === mapId
              ? {
                  ...map,
                  nodes: map.nodes.map((node) =>
                    node.id === nodeId ? { ...node, ...updates } : node
                  ),
                  updatedAt: new Date(),
                }
              : map
          ),
          currentMap:
            state.currentMap?.id === mapId
              ? {
                  ...state.currentMap,
                  nodes: state.currentMap.nodes.map((node) =>
                    node.id === nodeId ? { ...node, ...updates } : node
                  ),
                  updatedAt: new Date(),
                }
              : state.currentMap,
        }));
      },

      removeNode: (mapId, nodeId) => {
        set((state) => ({
          maps: state.maps.map((map) =>
            map.id === mapId
              ? {
                  ...map,
                  nodes: map.nodes.filter((node) => node.id !== nodeId),
                  connections: map.connections.filter(
                    (conn) =>
                      conn.sourceId !== nodeId && conn.targetId !== nodeId
                  ),
                  updatedAt: new Date(),
                }
              : map
          ),
          currentMap:
            state.currentMap?.id === mapId
              ? {
                  ...state.currentMap,
                  nodes: state.currentMap.nodes.filter(
                    (node) => node.id !== nodeId
                  ),
                  connections: state.currentMap.connections.filter(
                    (conn) =>
                      conn.sourceId !== nodeId && conn.targetId !== nodeId
                  ),
                  updatedAt: new Date(),
                }
              : state.currentMap,
        }));
      },

      addConnection: (mapId, connection) => {
        set((state) => ({
          maps: state.maps.map((map) =>
            map.id === mapId
              ? {
                  ...map,
                  connections: [...map.connections, connection],
                  updatedAt: new Date(),
                }
              : map
          ),
          currentMap:
            state.currentMap?.id === mapId
              ? {
                  ...state.currentMap,
                  connections: [...state.currentMap.connections, connection],
                  updatedAt: new Date(),
                }
              : state.currentMap,
        }));
      },

      removeConnection: (mapId, connectionId) => {
        set((state) => ({
          maps: state.maps.map((map) =>
            map.id === mapId
              ? {
                  ...map,
                  connections: map.connections.filter(
                    (conn) => conn.id !== connectionId
                  ),
                  updatedAt: new Date(),
                }
              : map
          ),
          currentMap:
            state.currentMap?.id === mapId
              ? {
                  ...state.currentMap,
                  connections: state.currentMap.connections.filter(
                    (conn) => conn.id !== connectionId
                  ),
                  updatedAt: new Date(),
                }
              : state.currentMap,
        }));
      },

      updateNodePosition: (mapId, nodeId, position) => {
        set((state) => ({
          maps: state.maps.map((map) =>
            map.id === mapId
              ? {
                  ...map,
                  nodes: map.nodes.map((node) =>
                    node.id === nodeId ? { ...node, position } : node
                  ),
                  updatedAt: new Date(),
                }
              : map
          ),
          currentMap:
            state.currentMap?.id === mapId
              ? {
                  ...state.currentMap,
                  nodes: state.currentMap.nodes.map((node) =>
                    node.id === nodeId ? { ...node, position } : node
                  ),
                  updatedAt: new Date(),
                }
              : state.currentMap,
        }));
      },
    }),
    {
      name: 'knowledge-map-storage',
    }
  )
);