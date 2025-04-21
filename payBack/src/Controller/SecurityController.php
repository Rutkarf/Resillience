<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // Récupère l'erreur de connexion si elle existe
        $error = $authenticationUtils->getLastAuthenticationError();

        // Dernier nom d'utilisateur saisi
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error,
        ]);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        // Cette méthode peut rester vide - elle sera interceptée par le firewall
        throw new \LogicException('Cette méthode sera interceptée par le système de déconnexion');
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function apiLogin(): void
    {
        // Cette méthode sera interceptée par le firewall JWT
        throw new \LogicException('Cette méthode ne devrait jamais être appelée directement');
    }
}
